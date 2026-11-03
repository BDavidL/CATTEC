(()=>{'use strict';
 const BASE_W=1200,BASE_H=875,frame=document.getElementById('presentation'),viewer=document.getElementById('viewer');
 const slides=[...document.querySelectorAll('.slide')],topics=[...document.querySelectorAll('.topic')],prev=document.getElementById('prev'),next=document.getElementById('next');
 const counter=document.getElementById('pageCount'),part=document.getElementById('partLabel'),fill=document.getElementById('pageFill');let current=0;
 function resize(){const width=document.documentElement.clientWidth;const h=window.innerHeight||BASE_H;const scale=Math.min(1,width/BASE_W,h/BASE_H);frame.style.transform=`scale(${scale})`;viewer.style.height=`${BASE_H*scale}px`;}
 function show(i){current=Math.max(0,Math.min(i,slides.length-1));slides.forEach((s,j)=>{s.classList.toggle('active',j===current);s.setAttribute('aria-hidden',j===current?'false':'true');});const ch=Number(slides[current].dataset.chapter);
   topics.forEach(t=>{const active=Number(t.dataset.chapter)===ch;t.classList.toggle('active',active);t.setAttribute('aria-current',active?'page':'false');});
   prev.disabled=current===0;next.textContent=current===slides.length-1?'Volver al inicio':'Siguiente →';counter.textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
   part.textContent=slides[current].dataset.part?`Parte ${slides[current].dataset.part}`:'';fill.style.width=`${((current+1)/slides.length)*100}%`;
 }
 prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current===slides.length-1?0:current+1));
 topics.forEach(t=>t.addEventListener('click',()=>{const ch=Number(t.dataset.chapter),idx=slides.findIndex(s=>Number(s.dataset.chapter)===ch);if(idx>=0)show(idx);}));
 document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(Math.min(current+1,slides.length-1));if(e.key==='ArrowLeft')show(Math.max(0,current-1));});
 window.addEventListener('resize',resize);resize();show(0);
})();