const {JSDOM}=require('jsdom');
const fs=require('fs');
const html=fs.readFileSync('index_test.html','utf8');
const dom=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
w.matchMedia=()=>({matches:false,addListener(){},addEventListener(){}});
const ctx2={setTransform(){},fillRect(){},beginPath(){},arc(){},fill(){},stroke(){},fillText(){}};
['fillStyle','strokeStyle','globalAlpha','lineWidth','font','textAlign','textBaseline'].forEach(p=>Object.defineProperty(ctx2,p,{set(){},get(){return 1}}));
w.HTMLCanvasElement.prototype.getContext=()=>ctx2;
w.HTMLElement.prototype.animate=function(){return{onfinish:null,cancel(){}}};
let rafQ=[];w.requestAnimationFrame=f=>{rafQ.push(f);return rafQ.length};w.cancelAnimationFrame=()=>{};
w.navigator.vibrate=()=>{};
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];
const tests=`
;(function(){
  const run=(fn,label)=>{try{const r=fn();console.log(label,'ok',r===undefined?'':JSON.stringify(r).slice(0,110))}catch(e){console.error(label,'FAIL:',e.stack.split('\\n').slice(0,3).join(' | '));throw e}};
  run(()=>GROUPMETA.length,'groups');
  run(()=>{setGather('price');setPaint('strength')},'dials');
  run(()=>buildDeck(BY['NYKAA']).map(f=>f.label),'deck bespoke');
  run(()=>buildDeck(BY['CERA']).map(f=>f.label),'deck generic');
  run(()=>openCard('NYKAA','open'),'openCard');
  run(()=>{flipDeck(1);flipDeck(1)},'flipDeck');
  run(()=>{S.holds['NYKAA']=1;S.trail.push({sym:'NYKAA',type:'hold',day:0,t:1,extra:{paint:'strength',facet:'what could go wrong'}},{sym:'NYKAA',type:'open',day:0,t:1},{sym:'NYKAA',type:'open',day:1,t:1});return inviteEligible('NYKAA')},'inviteEligible');
  run(()=>showInvite('NYKAA'),'invite sheet');
  run(()=>closeCard(),'closeCard');
  run(()=>openComposer('NYKAA'),'composer');
  run(()=>{cs.dir='climb';cs.horizon='q';cs.frags=[0];cs.reason='she\\u2019s on a run';S.goal={name:'Goa \\u00b7 March',amount:40000};openSizing()},'sizing');
  run(()=>document.querySelector('#sizeok').click(),'book position');
  run(()=>S.hunches[0].amount,'hunch stored');
  run(()=>advance(63),'advance to horizon');
  run(()=>S.hunches[0].status+':'+S.hunches[0].verdict,'verdict resolved');
  run(()=>showVerdict(S.hunches[0]),'verdict card');
  run(()=>openYours(),'yours');
  run(()=>hunchSentence(S.hunches[0]),'sentence');
  run(()=>Math.round(corpusNow()),'corpus');
  run(()=>{const q=[...document.querySelectorAll('.dopt')].length;if(q<10)throw new Error('dials missing');return q},'dial options');
  console.log('ALL SMOKE TESTS PASSED');
})();`;
try{ w.eval(js+tests); }catch(e){ console.error('FAILED'); process.exit(1); }
for(let i=0;i<5;i++){const q=rafQ;rafQ=[];q.forEach(f=>{try{f(1000+i*16)}catch(e){console.error('TICK FAIL:',e.message);process.exit(1)}})}
console.log('render loop ok');
