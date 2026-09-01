const projects = [
  { file:'calaveras', title:'Calaveras de color', category:'Mural artístico', description:'Una pared convertida en identidad.', accent:'#dfff00', alt:'Mural colorido de calaveras y corazones' },
  { file:'kanpai-mural', title:'Kanpai', category:'Identidad gráfica', description:'Ilustración y señalética integradas al restaurante.', accent:'#ffcb3b', alt:'Mural gráfico en restaurante Kanpai' },
  { file:'kanpai-panoramica', title:'Universo Kanpai', category:'Intervención integral', description:'Una narrativa visual que recorre todo el espacio.', accent:'#ff5a36', alt:'Vista panorámica de la intervención mural Kanpai' },
  { file:'la-culposa-mural', title:'La Culposa', category:'Mural interior', description:'Personajes, color y geometría a escala arquitectónica.', accent:'#ff4ab8', alt:'Mural ilustrado de La Culposa' },
  { file:'la-culposa-lateral', title:'Gráfica que habla', category:'Identidad aplicada', description:'Mensajes de marca convertidos en superficie.', accent:'#f0ff48', alt:'Aplicación gráfica en mobiliario de La Culposa' },
  { file:'la-culposa-frente', title:'Frente de marca', category:'Gráfica comercial', description:'Identidad visible desde cada punto de contacto.', accent:'#ff623f', alt:'Frente gráfico de La Culposa' },
  { file:'universo-panoramico', title:'Del muro al recorrido', category:'Mural panorámico', description:'Una intervención que une varias escenas.', accent:'#7f67ff', alt:'Intervención mural panorámica en interior' },
  { file:'mona-gata', title:'Mona Gata', category:'Personaje mural', description:'Arte original con una presencia imposible de ignorar.', accent:'#4ff1ff', alt:'Personaje felino pintado en mural' },
  { file:'mural-luz', title:'La idea enciende', category:'Mural con luz', description:'Ilustración e iluminación trabajando como una sola pieza.', accent:'#5effff', alt:'Mural ilustrado con líneas luminosas' },
  { file:'movimiento-general', title:'Movimiento', category:'Mural abstracto', description:'Forma, ritmo y color dialogando con la arquitectura.', accent:'#ff7048', alt:'Mural abstracto en interior' },
  { file:'movimiento-amplio', title:'Espacio en movimiento', category:'Intervención mural', description:'Una composición continua que transforma el ambiente.', accent:'#ff9a47', alt:'Vista amplia de un mural abstracto' },
  { file:'movimiento-detalle', title:'Detalle orgánico', category:'Mural abstracto', description:'El trazo también se descubre de cerca.', accent:'#ff78ba', alt:'Detalle de mural con formas orgánicas' },
  { file:'jardin-mural', title:'Jardín mural', category:'Intervención volumétrica', description:'Capas, volumen y textura para crear un punto fotográfico.', accent:'#f4bed4', alt:'Intervención mural floral tridimensional' },
  { file:'paseo-interlomas', title:'Paseo Interlomas', category:'Tapial comercial', description:'Cobertura de gran formato para una apertura visible.', accent:'#f4ee44', alt:'Tapial publicitario curvo en centro comercial' },
  { file:'la-isla-noche', title:'La Isla', category:'Fachada nocturna', description:'Color de gran formato diseñado para funcionar con luz.', accent:'#61ff87', alt:'Fachada comercial iluminada de noche' },
  { file:'la-isla-dia', title:'Fachada comercial', category:'Tapial exterior', description:'Impacto a distancia y lectura clara de marca.', accent:'#53e5ff', alt:'Fachada comercial vista de día' },
  { file:'buffalo-instalacion', title:'Buffalo Wild Wings', category:'Instalación', description:'Producción y montaje en superficies de gran escala.', accent:'#ffdf42', alt:'Instalación gráfica exterior en proceso' },
  { file:'instalacion-cristal', title:'Altura y precisión', category:'Montaje gran formato', description:'Instalación técnica para espacios comerciales complejos.', accent:'#ff5538', alt:'Instalación gráfica sobre cristal en altura' },
  { file:'cafe-montana', title:'Café Montana', category:'Identidad mural', description:'Una marca convertida en gesto gráfico sobre el muro.', accent:'#f4d85a', alt:'Logotipo mural de Café Montana' },
  { file:'calibracion-color', title:'Color bajo control', category:'Producción', description:'Pruebas y calibración para respetar cada tono.', accent:'#00d9ff', alt:'Proceso profesional de calibración de color' },
  { file:'piso-grafico', title:'El espacio completo', category:'Aplicación en piso', description:'La intervención también sucede bajo los pies.', accent:'#ff5c9e', alt:'Aplicación gráfica de patrón sobre piso' },
  { file:'piso-detalle', title:'Patrón y superficie', category:'Detalle de instalación', description:'Precisión de registro en cada módulo.', accent:'#a78cff', alt:'Detalle de piso gráfico instalado' },
  { file:'concepto-mall', title:'Antes de producir', category:'Visualización', description:'Propuestas a escala para decidir con claridad.', accent:'#50f49a', alt:'Visualización de concepto gráfico para centro comercial' },
  { file:'concepto-tapial', title:'Concepto de tapial', category:'Diseño previo', description:'La idea se prueba en el espacio antes de instalarse.', accent:'#ffde45', alt:'Presentación de concepto para tapial comercial' },
  { file:'concepto-techo', title:'Todas las superficies', category:'Concepto espacial', description:'Muros, techos, cristales y pisos pueden contar la historia.', accent:'#ff693d', alt:'Intervención gráfica de techo en un espacio interior' }
];

const root = document.documentElement;
const portfolio = document.querySelector('[data-portfolio]');
const stage = document.querySelector('[data-stage]');
const ambient = document.querySelector('[data-ambient]');
const info = document.querySelector('[data-info]');
const title = document.querySelector('[data-title]');
const category = document.querySelector('[data-category]');
const description = document.querySelector('[data-description]');
const indexLabel = document.querySelector('[data-index]');
const thumbs = document.querySelector('[data-thumbs]');
const layers = [document.querySelector('[data-layer="a"]'), document.querySelector('[data-layer="b"]')];
let activeLayer = 0;
let activeIndex = 0;
let changeToken = 0;
let wheelLocked = false;
let touchStartX = 0;
let touchStartY = 0;

document.querySelector('[data-archive-count]').textContent = `${projects.length} proyectos`;

projects.forEach((project, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'thumb';
  button.dataset.number = String(index + 1).padStart(2, '0');
  button.setAttribute('aria-label', `Ver ${project.title}`);
  button.innerHTML = `<img src="assets/thumbs/${project.file}.webp" alt="" loading="lazy" />`;
  button.addEventListener('click', () => showProject(index));
  thumbs.append(button);
});

function wrap(index) {
  return (index + projects.length) % projects.length;
}

function preload(index) {
  const image = new Image();
  image.src = `assets/full/${projects[wrap(index)].file}.webp`;
}

async function showProject(nextIndex, immediate = false) {
  const normalized = wrap(nextIndex);
  if (!immediate && normalized === activeIndex) return;
  const project = projects[normalized];
  const token = ++changeToken;
  const nextLayerIndex = immediate ? activeLayer : 1 - activeLayer;
  const nextLayer = layers[nextLayerIndex];
  const currentLayer = layers[activeLayer];
  const source = `assets/full/${project.file}.webp`;

  if (!immediate) info.classList.add('is-changing');
  nextLayer.src = source;
  nextLayer.alt = project.alt;
  try { await nextLayer.decode(); } catch (_) { /* onload fallback */ }
  if (token !== changeToken) return;

  title.textContent = project.title;
  category.textContent = project.category;
  description.textContent = project.description;
  indexLabel.textContent = `${String(normalized + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  root.style.setProperty('--accent', project.accent);
  ambient.style.opacity = '.12';
  ambient.src = source;

  if (!immediate) {
    nextLayer.classList.add('is-visible');
    currentLayer.classList.remove('is-visible');
    activeLayer = nextLayerIndex;
  }

  activeIndex = normalized;
  const thumb = thumbs.children[normalized];
  [...thumbs.children].forEach((item, i) => item.classList.toggle('is-active', i === normalized));
  thumb.scrollIntoView({ behavior:immediate ? 'auto' : 'smooth', block:'nearest', inline:'center' });

  requestAnimationFrame(() => {
    info.classList.remove('is-changing');
    ambient.style.opacity = '.42';
  });
  preload(normalized + 1);
  preload(normalized - 1);
}

function next() { showProject(activeIndex + 1); }
function previous() { showProject(activeIndex - 1); }

document.querySelector('[data-next]').addEventListener('click', next);
document.querySelector('[data-prev]').addEventListener('click', previous);
document.querySelector('[data-home]').addEventListener('click', event => { event.preventDefault(); showProject(0); });

portfolio.addEventListener('wheel', event => {
  if (wheelLocked || Math.abs(event.deltaY) < 22) return;
  wheelLocked = true;
  event.deltaY > 0 ? next() : previous();
  setTimeout(() => { wheelLocked = false; }, 650);
}, { passive:true });

stage.addEventListener('touchstart', event => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive:true });

stage.addEventListener('touchend', event => {
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 42) return;
  const forward = Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0;
  forward ? next() : previous();
}, { passive:true });

window.addEventListener('keydown', event => {
  if (['ArrowRight','ArrowDown','PageDown',' '].includes(event.key)) { event.preventDefault(); next(); }
  if (['ArrowLeft','ArrowUp','PageUp'].includes(event.key)) { event.preventDefault(); previous(); }
});

showProject(0, true);
