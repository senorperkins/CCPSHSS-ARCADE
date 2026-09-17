// Rendering and physical input stay outside the pure route model.
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg';
const project=([lon,lat])=>[(lon+78.25)*270, (39.05-lat)*280];
let missionIndex=0,state,selected,labels=true,notes=[],zoom=false;
const mission=()=>CONTENT.missions[missionIndex];
const river=()=>CONTENT.rivers.find(r=>r.id===mission().river);
function svg(tag,attrs,parent=$('map')){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));parent.append(el);return el;}
function textAt(text,coord,cls,parent){const [x,y]=project(coord);const el=svg('text',{x,y,class:cls},parent);el.textContent=text;return el;}
function path(points){return points.map((p,i)=>(i?'L':'M')+project(p).join(',')).join(' ');}
function say(text,correction=false){$('feedback').textContent=text;$('feedback').classList.toggle('correction',correction);}
function draw(){
 const map=$('map');map.replaceChildren();map.classList.toggle('hidden-labels',!labels);
 const title=svg('title',{});title.textContent='Eastern Virginia river navigation chart';
 BOUNDARIES.forEach(f=>{const polygons=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];polygons.forEach(poly=>svg('path',{d:poly.map(r=>path(r)+'Z').join(' '),class:'land'}));});
 // Coordinates are geographic; the game intentionally displays only eastern Virginia.
 textAt('MARYLAND',[-76.5,38.75],'geo-label');textAt('PIEDMONT',[-78.12,38.1],'geo-label');
 textAt('COASTAL PLAIN',[-77.1,36.87],'geo-label');textAt('(TIDEWATER)',[-77.0,36.8],'geo-label');
 const bay=textAt('CHESAPEAKE BAY',[-76.02,38.1],'water-label');bay.setAttribute('transform',`rotate(84 ${project([-76.02,38.1]).join(' ')})`);
 textAt('ATLANTIC',[-75.66,37.5],'water-label');textAt('OCEAN',[-75.6,37.4],'water-label');
 const shore=textAt('EASTERN SHORE',[-75.78,38.04],'geo-label');shore.setAttribute('transform',`rotate(67 ${project([-75.78,38.04]).join(' ')})`);
 svg('path',{d:path([[-77.14,38.96],[-77.46,38.3],[-77.44,37.53],[-77.4,37.23],[-77.64,36.62]]),fill:'none',stroke:'#a87136','stroke-width':3,'stroke-dasharray':'7 7'});
 textAt('FALL LINE',[-77.9,37.72],'geo-label');
 CONTENT.rivers.forEach(r=>svg('path',{d:path(r.points),class:'river'+(r.id===river().id?' active-river':'')}));
 CONTENT.rivers.forEach(r=>{
  textAt(r.name,r.label,'river-label');
  const c=r.points[r.cityIndex];textAt(r.city,[c[0]-.27,c[1]+.055],'city-label');
  r.points.forEach((point,i)=>{const [x,y]=project(point);const group=svg('g',{class:'marker','data-river':r.id,'data-index':i,tabindex:0,role:'button','aria-label':`${r.name}, bend ${i+1}${i===r.cityIndex?', '+r.city:''}`});svg('circle',{cx:x,cy:y,r:Math.min(21,...CONTENT.rivers.flatMap(other=>other.points.filter(p=>p!==point).map(p=>{const q=project(p);return Math.hypot(q[0]-x,q[1]-y)/2-.5}))),class:'hit'},group);svg('circle',{cx:x,cy:y,r:5,class:'dot'},group);group.addEventListener('click',()=>travel(r.id,i));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();travel(r.id,i);}});group.addEventListener('focus',()=>{selected={river:r.id,index:i};highlight();});});
 });
 textAt('N',[-78.03,38.86],'geo-label');svg('path',{d:'M64 104 L64 65 L57 80 M64 65 L71 80',fill:'none',stroke:'#234e46','stroke-width':2});
 svg('path',{id:'boat',class:'boat'});update();
}
function highlight(){document.querySelectorAll('.marker').forEach(el=>el.classList.toggle('selected',selected&&el.dataset.river===selected.river&&Number(el.dataset.index)===selected.index));}
function update(){
 const r=river(),[x,y]=project(r.points[state.index]);$('boat').setAttribute('d',`M${x},${y-12} L${x+9},${y} L${x},${y+12} L${x-9},${y}Z`);
 $('map').setAttribute('viewBox',zoom?`${Math.max(0,Math.min(460,x-180))} ${Math.max(0,Math.min(350,y-150))} 360 300`:'0 0 820 650');
 $('mode').textContent=state.mode==='boat'?'◆ ABOARD THE BOAT':'◆ CARRYING CARGO';
 $('location').textContent=`${r.name} · ${state.index===r.cityIndex?r.city:'bend '+(state.index+1)}`;
 $('next').hidden=!state.done;$('next').textContent=missionIndex===3?'Finish expedition →':'Next expedition →';
 $('carry').disabled=state.done;$('hint').disabled=state.done;
 $('progress').replaceChildren();CONTENT.missions.forEach((m,i)=>{const el=document.createElement('span');el.textContent=i<missionIndex||i===missionIndex&&state.done?'✓':i+1;el.className=i===missionIndex?'active':i<missionIndex?'finished':'';$('progress').append(el);});highlight();
}
function travel(id,index){const result=move(state,mission(),river(),index,id);say(result.text,!result.ok);document.querySelectorAll('.hinted').forEach(el=>el.classList.remove('hinted'));if(result.ok&&state.done){notes[missionIndex]=mission().discovery;renderNotes();}update();}
function renderNotes(){$('notebook').textContent=notes.filter(Boolean).join(' ')||'Complete routes to record your discoveries.';}
function start(){state=createState(mission(),river());selected={river:river().id,index:state.index};$('missionNumber').textContent=`ROUTE ${missionIndex+1} OF 4`;$('missionTitle').textContent=mission().title;$('brief').textContent=mission().brief;say('Your cargo is the rust-colored diamond. Find the next connected bend. Need a hand? Use “Show next bend.”');draw();}
$('carry').onclick=()=>{say(changeMode(state,mission(),river()));update();};
$('hint').onclick=()=>{const n=state.index+mission().direction;const el=document.querySelector(`[data-river="${river().id}"][data-index="${n}"]`);el?.classList.add('hinted');say(mission().portage&&state.index===river().fall&&state.mode==='boat'?'You are at the Fall Line. Carry cargo, then travel to the gold marker.':'The gold marker is the next connected bend. Notice its direction from your cargo.');};
$('restart').onclick=()=>{notes[missionIndex]=null;renderNotes();start();};
$('next').onclick=()=>{if(missionIndex<3){missionIndex++;start();$('map').focus();}else{$('completion').hidden=false;$('next').hidden=true;$('replay').focus();}};
$('replay').onclick=()=>{missionIndex=0;notes=[];renderNotes();$('completion').hidden=true;start();$('map').focus();};
$('labelsButton').onclick=()=>{labels=!labels;$('map').classList.toggle('hidden-labels',!labels);$('labelsButton').textContent='Labels: '+(labels?'on':'off');$('labelsButton').setAttribute('aria-pressed',labels);};
$('zoomButton').onclick=()=>{zoom=!zoom;$('zoomButton').textContent=zoom?'Whole map':'Zoom map';$('zoomButton').setAttribute('aria-pressed',zoom);update();};
$('map').addEventListener('click',e=>{if(!e.target.closest('.marker'))say('Choose a river bend. Boats follow connected waterways; they cannot cut across the land between rivers.',true);});
function guide(open){$('guide').hidden=!open;$('guideButton').setAttribute('aria-expanded',open);(open?$('closeGuide'):$('guideButton')).focus();}
$('guideButton').onclick=()=>guide($('guide').hidden);$('closeGuide').onclick=()=>guide(false);
$('map').addEventListener('keydown',e=>{
 const directions={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
 if(e.key==='Enter'||e.key===' '){e.preventDefault();if(selected)travel(selected.river,selected.index);return;}
 if(!directions[e.key])return;e.preventDefault();const d=directions[e.key];const from=CONTENT.rivers.find(r=>r.id===selected.river).points[selected.index];const origin=project(from);let best=null;
 CONTENT.rivers.forEach(r=>r.points.forEach((p,i)=>{const pos=project(p),dx=pos[0]-origin[0],dy=pos[1]-origin[1],along=dx*d[0]+dy*d[1];if(along<2)return;const score=Math.hypot(dx,dy)+Math.abs(dx*d[1]-dy*d[0])*2;if(!best||score<best.score)best={river:r.id,index:i,score};}));
 if(best){selected=best;document.querySelector(`[data-river="${best.river}"][data-index="${best.index}"]`).focus();highlight();}
});
start();

