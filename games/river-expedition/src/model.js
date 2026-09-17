// Pure fixed-step simulation. Distances are game units, never miles.
export const WORLD = {width:640,height:400,playerY:288,step:1/60};
export function seededRandom(seed){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export function riverProfile(leg,s){const center=302+Math.sin(s/510)*leg.bend+Math.sin(s/183)*9;const width=leg.width+Math.sin(s/430)*18;return {center,left:center-width/2,right:center+width/2,width};}
export function trailX(leg,s){return riverProfile(leg,s).right+70;}
export function makeHazards(leg,seed){const rand=seededRandom(seed),out=[];const spacing=(leg.length-750)/leg.hazardCount;const jitter=Math.max(0,Math.min(spacing*.25,(spacing-(leg.speed||50)*1.24*1.4)/2));for(let i=0;i<leg.hazardCount;i++){const s=400+i*spacing+(rand()-.5)*2*jitter;const bank=riverProfile(leg,s),kind=leg.kinds[Math.floor(rand()*leg.kinds.length)];out.push({id:i,s,x:leg.mode==='walk'?trailX(leg,s)+(rand()-.5)*48:bank.left+35+rand()*(bank.width-70),kind,radius:kind==='shoal'?25:kind==='log'?19:12,cooldown:0});}return out;}
export function makePickups(leg,seed,hazards){const rand=seededRandom(seed^0x5138A7),result=[],count=leg.heartCount??3;for(let i=0;i<count;i++){const target=leg.length*(i+1)/(count+1);const gaps=hazards.slice(0,-1).map((h,j)=>({s:(h.s+hazards[j+1].s)/2,a:h,b:hazards[j+1]})).filter(g=>g.s-g.a.s>g.a.radius+32&&g.b.s-g.s>g.b.radius+32&&!result.some(p=>Math.abs(p.s-g.s)<90));gaps.sort((a,b)=>Math.abs(a.s-target)-Math.abs(b.s-target));if(!gaps.length)continue;const s=gaps[0].s,bank=riverProfile(leg,s);result.push({id:'heart-'+i,s,x:leg.mode==='walk'?trailX(leg,s)+(rand()-.5)*18:bank.left+40+rand()*(bank.width-80),collected:false});}return result;}
export function createExpedition(pack,assist=false,seed=pack.seed){return {pack,seed,legIndex:0,phase:'title',progress:0,x:302,speed:0,slow:0,invulnerable:0,time:0,legTime:0,bumps:0,health:5,maxHealth:5,rescues:0,pickups:[],pickupFlash:0,pickupMessage:'',visited:[],observations:0,seen:[],notes:[],assist,events:[],hazards:[],dockReady:false,atEnd:false,dockTime:0,dockFromX:0,dockFromProgress:0,finished:false};}
export function beginLeg(state,index){state.legIndex=index;const leg=state.pack.legs[index];state.phase='play';state.progress=0;state.x=leg.mode==='walk'?trailX(leg,0):riverProfile(leg,0).center;state.speed=0;state.slow=0;state.invulnerable=0;state.legTime=0;state.events=[];state.seen=[];state.health=state.maxHealth;state.dockReady=false;state.atEnd=false;state.dockTime=0;state.pickupFlash=0;state.hazards=makeHazards(leg,state.seed+index*79);state.pickups=makePickups(leg,state.seed+index*79,state.hazards);}
export function currentLeg(state){return state.pack.legs[state.legIndex];}
export function bump(state,text){if(state.invulnerable>0||state.phase!=='play')return;state.bumps++;state.health=Math.max(0,state.health-1);state.slow=1.1;state.invulnerable=2;state.events.push({type:'bump',text:`${text} ${state.health} of ${state.maxHealth} hearts remain.`});if(state.health===0){state.phase='rescue';state.rescues++;state.events.push({type:'rescue',text:'Time for a repair break. Your discoveries are safe.'});}}
export function recover(state){if(state.phase!=='rescue')return;const leg=currentLeg(state);state.progress=Math.max(0,state.progress-120);state.x=leg.mode==='walk'?trailX(leg,state.progress):riverProfile(leg,state.progress).center;state.health=state.maxHealth;state.slow=0;state.invulnerable=4;state.phase='play';state.events=[];}
export function tick(state,input,dt){
 if(state.phase==='docking'){dt=Math.min(Math.max(dt,0),.05);state.events=[];state.dockTime+=dt;const t=Math.min(1,state.dockTime/.85),ease=t*t*(3-2*t),leg=currentLeg(state),x=leg.mode==='walk'?trailX(leg,leg.length):riverProfile(leg,leg.length).right-17;state.x=state.dockFromX+(x-state.dockFromX)*ease;state.progress=state.dockFromProgress+(leg.length-state.dockFromProgress)*ease;if(t===1){state.phase='checkpoint';state.health=state.maxHealth;state.events.push({type:'arrival'});}return;}
 if(state.phase!=='play')return;dt=Math.min(Math.max(dt,0),.05);const leg=currentLeg(state);state.events=[];state.time+=dt;state.legTime+=dt;state.slow=Math.max(0,state.slow-dt);state.invulnerable=Math.max(0,state.invulnerable-dt);
 const axisX=Math.max(-1,Math.min(1,input.x||0)),axisY=Math.max(-1,Math.min(1,input.y||0));
 state.pickupFlash=Math.max(0,state.pickupFlash-dt);
 const water=leg.tidal?Math.sin(state.legTime/11)*leg.current:leg.current;
 let forward=(leg.speed||50)*(1-axisY*.24);
 if(state.assist)forward*=.8;
 if(state.slow>0)forward*=.35;
 state.speed=forward;state.progress=Math.max(0,Math.min(leg.length,state.progress+forward*dt));
 const profile=riverProfile(leg,state.progress);
 state.x+=axisX*(leg.mode==='walk'?88:125)*dt;
 if(leg.mode==='boat'&&!state.assist)state.x+=Math.sin(state.time*2.4)*water*dt;
 const left=leg.mode==='walk'?trailX(leg,state.progress)-44:profile.left+11;
 const right=leg.mode==='walk'?trailX(leg,state.progress)+44:profile.right-11;
 if(state.x<left||state.x>right){state.x=Math.max(left,Math.min(right,state.x));if(state.legTime>2)bump(state,leg.mode==='walk'?'Stay on the shore trail. The cargo is safe.':'Shallow bank! Steer back into the blue channel. Your boat will recover.');}
 for(const h of state.hazards){if(Math.abs(h.s-state.progress)<h.radius+7&&Math.abs(h.x-state.x)<h.radius+6){bump(state,h.kind==='shoal'?'Shallow water slows the boat. Look for the darker channel.':h.kind==='root'?'A root on the trail slows your steps. Walk around it.':h.kind==='rock'?'Rock bump! Slow your approach and steer through the open gap.':'Driftwood bump! Steer around the log; the boat will recover.');}}
 if(state.phase==='play')for(const item of state.pickups){if(!item.collected&&Math.abs(item.s-state.progress)<23&&Math.abs(item.x-state.x)<22){item.collected=true;const previous=state.health;state.health=Math.min(state.maxHealth,state.health+1);state.pickupFlash=1.3;state.pickupMessage=state.health>previous?'+1 ♥':'FULL ♥';state.events.push({type:'pickup',text:state.health>previous?`Heart collected! ${state.health} of ${state.maxHealth} hearts.`:`Heart collected. Already at the maximum: ${state.maxHealth} hearts.`});}}
 const mark=Math.floor(state.progress/(leg.length/3));if(mark>0&&mark<3&&!state.seen.includes(mark)){state.seen.push(mark);state.observations++;state.events.push({type:'observation',text:leg.observation});}
 state.atEnd=state.progress>=leg.length-55;state.dockReady=state.atEnd;
 if(state.atEnd&&state.phase==='play'){state.phase='docking';state.dockTime=0;state.dockFromX=state.x;state.dockFromProgress=state.progress;if(!state.visited.includes(leg.id))state.visited.push(leg.id);state.events.push({type:'autodock',text:leg.mode==='walk'?'Base camp reached. Setting down your cargo.':'Landing line crossed. Bringing your boat safely to the dock.'});}
}
export function dock(state){return state.phase==='docking'||state.phase==='checkpoint';}
export function recordLeg(state){if(!state.notes.some(n=>n.id===currentLeg(state).id)){const leg=currentLeg(state);state.notes.push({id:leg.id,title:leg.journalTitle,text:leg.journal});}}
export function advance(state){recordLeg(state);if(state.legIndex===state.pack.legs.length-1){state.phase='complete';state.finished=true;}else beginLeg(state,state.legIndex+1);}
