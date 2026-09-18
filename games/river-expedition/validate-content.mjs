export default function validateContent({LEVEL: level}) {
if(level.schemaVersion!==1||level.legs.length<1)throw Error('Unsupported content pack');
const questionIds=new Set();
for(const leg of level.legs){
 if(!['boat','walk'].includes(leg.mode)||!Number.isFinite(leg.length)||leg.length<=600)throw Error('Invalid leg '+leg.id);
 if(!leg.fieldNote?.text)throw Error('Missing field note: '+leg.id);
 for(const stage of ['dock','camp']){
  if(leg.questions?.[stage]?.length!==5)throw Error('Expected five '+stage+' questions: '+leg.id);
  for(const q of leg.questions[stage]){
   if(questionIds.has(q.id)||!q.prompt||!q.explanation||!q.hint||q.hint===q.explanation||!level.questionSources[q.source]||!Array.isArray(q.choices)||q.choices.length<2||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.choices.length)throw Error('Invalid question: '+q.id);
   questionIds.add(q.id);
  }
 }
}
}
