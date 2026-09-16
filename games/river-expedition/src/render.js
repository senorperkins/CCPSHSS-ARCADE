import {WORLD,riverProfile,trailX,currentLeg,seededRandom} from './model.js';
export function createRenderer(canvas,assets){
 const ctx=canvas.getContext('2d',{alpha:false});canvas.width=WORLD.width;canvas.height=WORLD.height;ctx.imageSmoothingEnabled=false;
 const sprites={};for(const [name,rows] of Object.entries(assets)){if(name==='palette')continue;const tile=document.createElement('canvas');tile.width=Math.max(...rows.map(r=>r.length));tile.height=rows.length;const pen=tile.getContext('2d');rows.forEach((row,y)=>[...row].forEach((ch,x)=>{if(assets.palette[ch]){pen.fillStyle=assets.palette[ch];pen.fillRect(x,y,1,1);}}));sprites[name]=tile;}
 const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
 const sprite=(name,x,y,scale=1)=>{const t=sprites[name];if(t)ctx.drawImage(t,Math.round(x-t.width*scale/2),Math.round(y-t.height*scale/2),t.width*scale,t.height*scale);};
 const label=(text,x,y,color='#fff0bd',size=9)=>{ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';const width=ctx.measureText(text).width;rect(x-width/2-6,y-11,width+12,17,'#172f36');ctx.fillStyle=color;ctx.fillText(text,Math.round(x),Math.round(y));};
 function render(state,elapsed,reducedMotion=false){
  const leg=currentLeg(state),p=state.progress||0,t=reducedMotion?0:elapsed,waterDeep='hsl(193 '+(leg.waterSaturation||38)+'% 28%)',waterEdge='hsl(182 '+(leg.waterSaturation||38)+'% 35%)';ctx.imageSmoothingEnabled=false;
  rect(0,0,640,400,'#59915a');
  // The scrolling channel is an abstract navigation course, not geographic geometry.
  for(let y=0;y<400;y+=4){const s=p+WORLD.playerY-y,bank=riverProfile(leg,s);rect(bank.left-13,y,bank.width+26,4,'#366a4b');rect(bank.left-7,y,bank.width+14,4,'#d59858');rect(bank.left-2,y,bank.width+4,4,'#8cbb9b');rect(bank.left+5,y,bank.width-10,4,waterEdge);rect(bank.left+23,y,bank.width-46,4,waterDeep);if(leg.mode==='walk')rect(trailX(leg,s)-50,y,100,4,'#d59858');}
  // Shore tiles are seeded by world position so the scenery never jumps on scroll.
  const first=Math.floor((p-130)/50),last=Math.ceil((p+WORLD.playerY+40)/50);
  for(let row=first;row<=last;row++){const rand=seededRandom(row*7919+129381);const s=row*50,y=WORLD.playerY-(s-p),bank=riverProfile(leg,s);for(let j=0;j<9;j++){const side=j%2===0;let x=side?rand()*(bank.left-21):bank.right+22+rand()*(640-bank.right-22);if(leg.mode==='walk'&&Math.abs(x-trailX(leg,s))<60)continue;const sy=y+rand()*40;rect(x-8,sy+9,20,5,'#366a4b');sprite(rand()>.45?'tree':'pine',x,sy,rand()>.78?2:1.5);}
   for(let j=0;j<4;j++){const x=j%2?bank.left-4:bank.right+6;sprite('reeds',x+rand()*10,y+rand()*48,1);}
  }
  // Sparse pixel ripples drift with the visible water; no screen shake.
  for(let i=0;i<65;i++){const wy=(i*71+t*(leg.speed*.18))%460-30;const s=p+WORLD.playerY-wy,bank=riverProfile(leg,s);const x=bank.left+18+((i*83)%Math.max(1,bank.width-40));rect(x,wy,6+(i%3)*3,1,i%4?waterEdge:'#75bbbd');if(i%4===0)rect(x+4,wy+2,4,1,waterEdge);}
  if(leg.mode==='walk'){
   for(let row=Math.floor((p-120)/65);row<Math.ceil((p+320)/65);row++){const s=row*65,y=WORLD.playerY-(s-p),bank=riverProfile(leg,s);for(let x=bank.left+18;x<bank.right-12;x+=31){sprite('rock',x,y+Math.sin(x)*7,1.5);rect(x-8,y+14,19,2,'#a4d7cf');rect(x-4,y+19,13,2,'#fff0bd');}}
  }
  // Shoals are visibly pale; the deep channel remains darker.
  for(const hazard of state.hazards){const y=WORLD.playerY-(hazard.s-p);if(y< -40||y>440)continue;if(hazard.kind==='shoal'){sprite('shoal',hazard.x,y,2.2);}else if(hazard.kind==='root'){sprite(['log','log2','log3'][(hazard.id||0)%3],hazard.x,y,1.3);}else{sprite(hazard.kind==='rock'?['rock','rock2','rock3'][(hazard.id||0)%3]:['log','log2','log3'][(hazard.id||0)%3],hazard.x,y,hazard.kind==='rock'?1.25:1.3);}}
  // Context becomes visible in the world before the learning checkpoint.
  for(const item of state.pickups){const y=WORLD.playerY-(item.s-p);if(item.collected||y< -30||y>430)continue;const bob=reducedMotion?0:Math.sin(t*3+item.id.length)*2;sprite('heart',item.x,y+bob,2);}
  const endY=WORLD.playerY-(leg.length-p),endBank=riverProfile(leg,leg.length);
  if(endY> -190&&endY<450){
   if(leg.id==='falls'||leg.mode==='walk'){
    for(let j=0;j<4;j++){const yy=endY-70-j*26;for(let x=endBank.left+10;x<endBank.right-10;x+=18){rect(x,yy+Math.sin(x)*3,13,3,'#a4d7cf');rect(x+5,yy+5,9,2,'#fff0bd');if(j%2===0)sprite('rock',x+8,yy+11,1.3);}}
   }
   if(leg.mode==='boat'){
    rect(endBank.right-35,endY-24,91,48,'#172f36');rect(endBank.right-33,endY-22,88,43,'#8c503b');for(let y=endY-20;y<endY+20;y+=7)rect(endBank.right-32,y,86,4,'#d59858');rect(endBank.right-35,endY-23,4,47,'#f6d88b');
    sprite('flag',endBank.right+55,endY-36,2);sprite('crate',endBank.right+35,endY,1.4);
    label(state.visited.includes(leg.id)?(leg.id==='tidal'?'JAMESTOWN':leg.id==='falls'?'RICHMOND':'SUPPLY LANDING'):'LANDING',Math.min(548,endBank.right+56),endY-64);
    if(leg.id==='tidal'){rect(endBank.right+83,endY-42,38,27,'#8c503b');rect(endBank.right+79,endY-48,46,9,'#394c58');rect(endBank.right+96,endY-25,9,10,'#172f36');}
   }else{
    const camp=trailX(leg,leg.length);rect(camp-42,endY-50,85,90,'#d5bd79');sprite('tent',camp+5,endY-25,2.4);sprite('crate',camp-20,endY+18,1.3);sprite('flag',camp+37,endY-5,2);label('BASE CAMP',camp,endY-70);
   }
  }
  // Optional exploration details have no scoring or collection requirement.
  if(leg.id==='tidal'){const yy=(p*.7)%900-80;if(yy> -20&&yy<420){const bank=riverProfile(leg,p+WORLD.playerY-yy);sprite('bird',bank.left+10,yy,1.5);}}
  const py=WORLD.playerY,bob=reducedMotion?0:Math.sin(t*5)*1.2;
  if(leg.mode==='boat'){
   rect(state.x-7,py+23,14,3,'#75bbbd');rect(state.x-11,py+30,22,2,waterEdge);rect(state.x-15,py+37,30,1,waterEdge);
   ctx.save();ctx.translate(Math.round(state.x),Math.round(py+bob));ctx.rotate(state.slow>0&&!reducedMotion?Math.sin(t*16)*.12:0);if(state.invulnerable>0)ctx.globalAlpha=.8;sprite('boat',0,0,1.7);ctx.restore();
   {const stroke=state.phase==='play'&&!reducedMotion?Math.sin(t*4)*5:0,hx=state.x+3,hy=py-3,dx=17,dy=12+stroke;for(let step=0;step<=18;step++){const f=step/18;rect(hx+dx*f,hy+dy*f,2,2,'#d59858');}for(let step=14;step<=22;step++){const f=step/18;rect(hx+dx*f-1,hy+dy*f-1,4,4,'#d59858');rect(hx+dx*f,hy+dy*f,2,2,'#f6d88b');}rect(hx-1,hy-1,4,3,'#f6d88b');}
  }else{rect(state.x-9,py+12,18,4,'#8c503b');sprite('person',state.x,py+(state.speed&& !reducedMotion?Math.sin(t*10):0),2);}
  if(state.slow>0&&state.phase==='play'){ctx.strokeStyle='#f39473';ctx.lineWidth=3;ctx.beginPath();ctx.arc(state.x,py,22+(reducedMotion?0:(1.1-state.slow)*12),0,Math.PI*2);ctx.stroke();}
  if(state.pickupFlash>0&&state.phase==='play')label(state.pickupMessage,state.x,py-57-(reducedMotion?0:(1.3-state.pickupFlash)*10),'#bfe5a4',12);
  // Vignette is a solid pixel edge, never a blur filter.
  rect(0,0,640,2,'#172f36');rect(0,398,640,2,'#172f36');
 }
 return {render};
}
