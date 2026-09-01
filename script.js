document.documentElement.classList.add('js');
const experience = document.querySelector('[data-experience]');
const originalPanels = [...experience.querySelectorAll('.panel')];
const dotsWrap = document.querySelector('[data-dots]');
const currentEl = document.querySelector('[data-current]');
const sceneName = document.querySelector('[data-scene-name]');
const root = document.documentElement;

originalPanels.forEach((panel, index) => {
  panel.dataset.realIndex = index;
  panel.style.setProperty('--panel-accent', panel.dataset.accent);
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Ir a ${panel.dataset.label}`);
  dot.addEventListener('click', () => scrollToReal(index));
  dotsWrap.append(dot);
});

// Un clon en cada extremo permite que el recorrido vuelva a empezar sin un corte visible.
const firstClone = originalPanels[0].cloneNode(true);
const lastClone = originalPanels.at(-1).cloneNode(true);
firstClone.dataset.clone = 'first';
lastClone.dataset.clone = 'last';
firstClone.removeAttribute('id');
lastClone.removeAttribute('id');
experience.prepend(lastClone);
experience.append(firstClone);

const panels = [...experience.querySelectorAll('.panel')];
let panelHeight = window.innerHeight;
let activeRealIndex = 0;
let settleTimer;
let resizing = false;

function scrollToReal(index, behavior = 'smooth') {
  experience.scrollTo({ top: (index + 1) * panelHeight, behavior });
}

function setActive(panel) {
  panels.forEach(item => item.classList.toggle('is-active', item === panel));
  const realIndex = Number(panel.dataset.realIndex);
  if (!Number.isFinite(realIndex)) return;
  activeRealIndex = realIndex;
  const source = originalPanels[realIndex];
  root.style.setProperty('--accent', source.dataset.accent || '#dfff00');
  currentEl.textContent = String(realIndex).padStart(2, '0');
  sceneName.textContent = source.dataset.label;
  [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('is-active', i === realIndex));
}

function nearestPanel() {
  return Math.round(experience.scrollTop / panelHeight);
}

function settleLoop() {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    const position = nearestPanel();
    if (position === 0) {
      experience.scrollTo({ top: originalPanels.length * panelHeight, behavior: 'auto' });
      setActive(originalPanels.at(-1));
    } else if (position === panels.length - 1) {
      experience.scrollTo({ top: panelHeight, behavior: 'auto' });
      setActive(originalPanels[0]);
    }
  }, 150);
}

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(visible.target);
}, { root: experience, threshold: [.55, .75] });

panels.forEach(panel => observer.observe(panel));
experience.addEventListener('scroll', settleLoop, { passive:true });

window.addEventListener('keydown', event => {
  if (['ArrowDown','PageDown',' '].includes(event.key)) {
    event.preventDefault();
    scrollToReal((activeRealIndex + 1) % originalPanels.length);
  }
  if (['ArrowUp','PageUp'].includes(event.key)) {
    event.preventDefault();
    scrollToReal((activeRealIndex - 1 + originalPanels.length) % originalPanels.length);
  }
});

document.querySelectorAll('[data-go]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  scrollToReal(Number(link.dataset.go));
}));

window.addEventListener('resize', () => {
  if (resizing) return;
  resizing = true;
  requestAnimationFrame(() => {
    panelHeight = window.innerHeight;
    scrollToReal(activeRealIndex, 'auto');
    resizing = false;
  });
});

requestAnimationFrame(() => {
  panelHeight = window.innerHeight;
  experience.scrollTop = panelHeight;
  setActive(originalPanels[0]);
});
