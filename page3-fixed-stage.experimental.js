/* Page 3 fixed 1920x1080 stage - experimental, branch only.
   Integration requires isolating existing viewport-dependent CSS and alert positioning.
   Do not deploy or include this file until integration checks pass. */
(function(){
  'use strict';
  const BASE_WIDTH=1920,BASE_HEIGHT=1080;
  function fit(){
    const root=document.getElementById('teamBoardPageV29');
    if(!root)return;
    const scale=Math.min(window.innerWidth/BASE_WIDTH,window.innerHeight/BASE_HEIGHT);
    root.style.setProperty('--page3-fixed-scale',String(scale));
    root.style.setProperty('--page3-fixed-left',Math.max(0,(window.innerWidth-BASE_WIDTH*scale)/2)+'px');
    root.style.setProperty('--page3-fixed-top',Math.max(0,(window.innerHeight-BASE_HEIGHT*scale)/2)+'px');
  }
  window.addEventListener('resize',fit,{passive:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fit,{once:true});
  else fit();
})();
