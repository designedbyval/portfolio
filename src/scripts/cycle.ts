/**
 * Flipbook / word cycler.
 *
 * Markup contract:
 *   <el data-cycle data-interval="800">
 *     <child data-cycle-frame data-active> …first variant… </child>
 *     <child data-cycle-frame> … </child>
 *   </el>
 *
 * Swaps are instant (no transition), mirroring the Figma prototype
 * ("After delay" → "Change to", transition: Instant).
 * With prefers-reduced-motion the first variant stays visible and nothing animates.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

type Cycler = { el: HTMLElement; frames: HTMLElement[]; index: number; timer?: number };

const cyclers: Cycler[] = [];

function show(c: Cycler, i: number) {
  c.frames.forEach((f, n) => f.toggleAttribute('data-active', n === i));
  c.index = i;
}

function start(c: Cycler) {
  stop(c);
  if (reducedMotion.matches || c.frames.length < 2) return;
  const interval = Number(c.el.dataset.interval) || 800;
  c.timer = window.setInterval(() => show(c, (c.index + 1) % c.frames.length), interval);
}

function stop(c: Cycler) {
  if (c.timer !== undefined) window.clearInterval(c.timer);
  c.timer = undefined;
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-cycle]').forEach((el) => {
    if (el.dataset.cycleReady) return;
    el.dataset.cycleReady = 'true';
    const frames = Array.from(el.querySelectorAll<HTMLElement>(':scope > [data-cycle-frame]'));
    const c: Cycler = { el, frames, index: 0 };
    show(c, 0);
    cyclers.push(c);
    start(c);
  });
}

reducedMotion.addEventListener('change', () => {
  cyclers.forEach((c) => {
    if (reducedMotion.matches) {
      stop(c);
      show(c, 0);
    } else {
      start(c);
    }
  });
});

// Don't burn timers in background tabs.
document.addEventListener('visibilitychange', () => {
  cyclers.forEach((c) => (document.hidden ? stop(c) : start(c)));
});

init();
