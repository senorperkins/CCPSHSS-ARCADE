export function createInput(canvas,{onAction,onPause}){
 const held=new Set(),touch=new Map();let pointer=null;const codes={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down'};
 const clear=()=>{held.clear();touch.clear();pointer=null;document.querySelectorAll('[data-direction]').forEach(b=>b.classList.remove('held'));};
 window.addEventListener('keydown',e=>{
  if(e.code==='Escape'||e.code==='KeyP'){if(!e.repeat){e.preventDefault();clear();onPause();}return;}
  if(e.target.closest('button,input,select,textarea,[role="dialog"]'))return;
  if(codes[e.code]){e.preventDefault();held.add(codes[e.code]);}
  if((e.code==='KeyE'||e.code==='Space')&&!e.repeat){e.preventDefault();onAction();}
 });
 window.addEventListener('keyup',e=>{if(codes[e.code])held.delete(codes[e.code]);});
 window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);
 document.querySelectorAll('[data-direction]').forEach(button=>{
  button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);touch.set(e.pointerId,button.dataset.direction);button.classList.add('held');});
  const release=e=>{touch.delete(e.pointerId);button.classList.remove('held');};button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
 });
 canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointer={id:e.pointerId,x:(e.clientX-canvas.getBoundingClientRect().left)/canvas.getBoundingClientRect().width*640};});
 canvas.addEventListener('pointermove',e=>{if(pointer?.id===e.pointerId)pointer.x=(e.clientX-canvas.getBoundingClientRect().left)/canvas.getBoundingClientRect().width*640;});
 const stop=e=>{if(pointer?.id===e.pointerId)pointer=null;};canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);canvas.addEventListener('lostpointercapture',stop);
 return {clear,read(playerX){const active=new Set([...held,...touch.values()]);let x=Number(active.has('right'))-Number(active.has('left'));const y=Number(active.has('down'))-Number(active.has('up'));if(pointer)x=Math.max(-1,Math.min(1,(pointer.x-playerX)/22));return {x,y};}};
}
