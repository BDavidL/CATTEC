
(function(){
 'use strict';
 const W=1200,H=875;
 const mount=document.getElementById('viewport');
 const deck=document.getElementById('deck');
 const pages=[...document.querySelectorAll('.slide')];
 const prev=document.getElementById('previous');
 const next=document.getElementById('next');
 const nextText=document.getElementById('nextText');
 const nextArrow=document.getElementById('nextArrow');
 const indicator=document.getElementById('position');
 const fill=document.getElementById('fill');
 const progress= document.querySelector('.progress');
 const dots=document.getElementById('dots');
 let current=0;
 function resize(){
   const w=mount.clientWidth, h=mount.clientHeight;
   const scale=Math.min(w/W,h/H);
   deck.style.setProperty('--deck-scale',String(scale));
 }
 function go(i){
   current=Math.max(0,Math.min(pages.length-1,i));
   pages.forEach((el,n)=>{const visible=n===current; el.classList.toggle('is-active',visible);el.setAttribute('aria-hidden',visible?'false':'true');el.inert=!visible;});
   [...dots.children].forEach((d,n)=>d.setAttribute('aria-current',String(n===current)));
   indicator.textContent=String(current+1).padStart(2,'0')+' / '+String(pages.length).padStart(2,'0');
   fill.style.width=((current+1)/pages.length*100)+'%';
   progress.setAttribute('aria-valuenow',String(current+1));
   prev.disabled=current===0;
   nextText.textContent=current===pages.length-1?'Reiniciar':'Siguiente';
   nextArrow.innerHTML=current===pages.length-1?'&#8635;':'&#8594;';
 }
 pages.forEach((_,n)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ir a diapositiva '+(n+1));b.addEventListener('click',()=>go(n));dots.appendChild(b);});
 prev.addEventListener('click',()=>go(current-1));
 next.addEventListener('click',()=>go(current===pages.length-1?0:current+1));
 window.addEventListener('keydown',(e)=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.key==='ArrowLeft')go(current-1);if(e.key==='ArrowRight')go(Math.min(current+1,pages.length-1));});
 window.addEventListener('resize',resize);
 if('ResizeObserver'in window)new ResizeObserver(resize).observe(mount);
 resize();go(0);
})();
