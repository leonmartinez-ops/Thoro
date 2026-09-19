const projects=[
{src:'assets/full/calaveras.webp',title:'Calaveras de color',cat:'Mural artístico',accent:'#dfff00'},
{src:'assets/full/kanpai-mural.webp',title:'Kanpai',cat:'Identidad mural',accent:'#ffcb3b'},
{src:'assets/full/kanpai-panoramica.webp',title:'Universo Kanpai',cat:'Mural panorámico',accent:'#ff5a36'},
{src:'assets/full/la-culposa-mural.webp',title:'La Culposa',cat:'Mural interior',accent:'#ff4ab8'},
{src:'assets/full/la-culposa-lateral.webp',title:'Gráfica que habla',cat:'Identidad aplicada',accent:'#f0ff48'},
{src:'assets/full/la-culposa-frente.webp',title:'La Culposa',cat:'Gráfica comercial',accent:'#ff623f'},
{src:'assets/full/universo-panoramico.webp',title:'Universo mural',cat:'Intervención',accent:'#7f67ff'},
{src:'assets/full/mona-gata.webp',title:'Mona Gata',cat:'Personaje mural',accent:'#4ff1ff'},
{src:'assets/full/mural-luz.webp',title:'Luz + mural',cat:'Intervención',accent:'#5effff'},
{src:'assets/full/movimiento-general.webp',title:'Movimiento',cat:'Mural abstracto',accent:'#ff7048'},
{src:'assets/full/movimiento-amplio.webp',title:'Espacio en movimiento',cat:'Intervención mural',accent:'#ff9a47'},
{src:'assets/full/movimiento-detalle.webp',title:'Detalle orgánico',cat:'Mural abstracto',accent:'#ff78ba'},
{src:'assets/full/jardin-mural.webp',title:'Jardín mural',cat:'Intervención volumétrica',accent:'#f4bed4'},
{src:'assets/full/paseo-interlomas.webp',title:'Paseo Interlomas',cat:'Tapial comercial',accent:'#f4ee44'},
{src:'assets/full/la-isla-noche.webp',title:'La Isla',cat:'Fachada nocturna',accent:'#61ff87'},
{src:'assets/full/la-isla-dia.webp',title:'La Isla',cat:'Fachada comercial',accent:'#53e5ff'},
{src:'assets/full/buffalo-instalacion.webp',title:'Buffalo Wild Wings',cat:'Instalación',accent:'#ffdf42'},
{src:'assets/full/instalacion-cristal.webp',title:'Gran formato',cat:'Instalación',accent:'#ff5538'},
{src:'assets/full/cafe-montana.webp',title:'Café Montana',cat:'Identidad mural',accent:'#f4d85a'},
{src:'assets/full/calibracion-color.webp',title:'Color',cat:'Producción',accent:'#00d9ff'},
{src:'assets/full/piso-grafico.webp',title:'Gráfica en piso',cat:'Intervención',accent:'#ff5c9e'},
{src:'assets/full/piso-detalle.webp',title:'Patrón y superficie',cat:'Detalle',accent:'#a78cff'},
{src:'assets/full/concepto-mall.webp',title:'Visualización',cat:'Concepto',accent:'#50f49a'},
{src:'assets/full/concepto-tapial.webp',title:'Tapial',cat:'Concepto',accent:'#ffde45'},
{src:'assets/full/concepto-techo.webp',title:'Todas las superficies',cat:'Concepto espacial',accent:'#ff693d'},
{src:'assets/concepto-vertical.webp',title:'Escala vertical',cat:'Concepto',accent:'#dfff00'},
{src:'assets/lush-tapial.webp',title:'Lush',cat:'Tapial',accent:'#ffcb3b'},
{src:'assets/mural-floral.webp',title:'Mural floral',cat:'Arte mural',accent:'#ff78ba'},
{src:'assets/mural-mano.webp',title:'Hecho a mano',cat:'Proceso',accent:'#50f49a'},
{src:'assets/mural-panoramico.webp',title:'Panorámica',cat:'Mural',accent:'#53e5ff'},
{src:'assets/mural-pastel-detalle.webp',title:'Detalle',cat:'Mural',accent:'#f4bed4'},
{src:'assets/mural-pastel-general.webp',title:'Pastel',cat:'Mural',accent:'#ff9a47'},
{src:'assets/paseo-tapial.webp',title:'Paseo',cat:'Tapial',accent:'#f4ee44'}
];

const root=document.documentElement,portfolio=document.querySelector('[data-portfolio]'),stage=document.querySelector('[data-stage]'),info=document.querySelector('[data-info]'),title=document.querySelector('[data-title]'),cat=document.querySelector('[data-category]'),idx=document.querySelector('[data-index]'),progress=document.querySelector('[data-progress]'),guide=document.querySelector('[data-gesture-guide]'),layers=[document.querySelector('[data-layer="a"]'),document.querySelector('[data-layer="b"]')];
let active=0,layer=0,startX=0,startY=0,token=0;
const wrap=n=>(n+projects.length)%projects.length;
function hideGuide(){guide?.classList.add('is-hidden')}
function preload(n){const i=new Image();i.src=projects[wrap(n)].src}
async function show(n,immediate=false,direction=1){
 n=wrap(n); if(!immediate&&n===active)return;
 const p=projects[n],nextLayer=immediate?layer:1-layer,next=layers[nextLayer],current=layers[layer],t=++token;
 if(!immediate){info.classList.add('is-changing');next.className='stage-image '+(direction>0?'enter-next':'enter-prev')}
 next.src=p.src; next.alt=p.title;
 try{await next.decode()}catch(e){}
 if(t!==token)return;
 title.textContent=p.title;cat.textContent=p.cat;idx.textContent=String(n+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');root.style.setProperty('--accent',p.accent);progress.style.transform='scaleX('+((n+1)/projects.length)+')';
 if(!immediate){next.getBoundingClientRect();next.classList.add('is-visible');next.classList.remove(direction>0?'enter-next':'enter-prev');current.classList.remove('is-visible');current.classList.add(direction>0?'exit-next':'exit-prev');setTimeout(()=>current.classList.remove('exit-next','exit-prev'),700);layer=nextLayer}
 active=n;requestAnimationFrame(()=>info.classList.remove('is-changing'));preload(n+1);preload(n-1)
}
const next=()=>{hideGuide();navigator.vibrate?.(6);show(active+1,false,1)}
const prev=()=>{hideGuide();navigator.vibrate?.(6);show(active-1,false,-1)}
document.querySelector('[data-next]').onclick=next;document.querySelector('[data-prev]').onclick=prev;document.querySelector('[data-home]').onclick=e=>{e.preventDefault();show(0)};
portfolio.addEventListener('touchstart',e=>{if(e.target.closest('a,button'))return;const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;stage.classList.add('is-dragging')},{passive:true});
portfolio.addEventListener('touchmove',e=>{if(!stage.classList.contains('is-dragging'))return;const dx=e.changedTouches[0].clientX-startX;stage.style.setProperty('--drag-x',(dx*.22)+'px')},{passive:true});
portfolio.addEventListener('touchend',e=>{if(!stage.classList.contains('is-dragging'))return;const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;stage.classList.remove('is-dragging');stage.style.removeProperty('--drag-x');if(Math.max(Math.abs(dx),Math.abs(dy))<40)return;(Math.abs(dx)>Math.abs(dy)?dx<0:dy<0)?next():prev()},{passive:true});
stage.addEventListener('click',e=>{if(e.target.closest('a,button'))return;const r=stage.getBoundingClientRect();e.clientX<r.left+r.width/2?prev():next()});
window.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown',' '].includes(e.key))next();if(['ArrowLeft','ArrowUp'].includes(e.key))prev()});
show(0,true);setTimeout(hideGuide,3500);
