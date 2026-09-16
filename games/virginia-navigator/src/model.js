export function createState(mission, river) {return {index:mission.start??0,mode:'boat',done:false,steps:0,corrections:0};}
export function move(state,mission,river,index,riverId) {
 if(state.done)return {ok:false,text:'This expedition is complete. Open the next route.'};
 if(riverId!==river.id){state.corrections++;return {ok:false,text:'That is another river. Land separates these waterways. Follow your current river’s next bend.'};}
 if(index!==state.index+mission.direction){state.corrections++;return {ok:false,text:'Follow the connected waterway, one bend at a time. You cannot skip over land or river bends.'};}
 if(mission.portage&&state.index===river.fall&&state.mode==='boat'){state.corrections++;return {ok:false,text:'Rapids block the boat at the Fall Line. Select Carry cargo, then move around the rapids into the Piedmont.'};}
 state.index=index;state.steps++;
 state.done=mission.direction===1?index===river.points.length-1:index===0;
 return {ok:true,text:state.done?mission.discovery:mission.portage&&index===river.fall?'You reached Richmond at the Fall Line. Try continuing by boat, or carry your cargo around the rapids.':`You followed the ${river.name} ${mission.direction===1?'inland, upstream':'toward the bay, downstream'}. Find the next connected bend.`};
}
export function changeMode(state,mission,river){
 if(state.done)return 'This route is complete.';
 if(!mission.portage||state.index!==river.fall)return 'Carry cargo is used at the Richmond rapids. Stay with the boat on this stretch.';
 state.mode='carry';return 'Cargo lifted! Move to the next marker on the Piedmont side of the Fall Line.';
}
