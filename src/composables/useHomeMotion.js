import { onMounted, onBeforeUnmount, ref } from "vue";

// Figma annotations: display-only image carousel and scroll-linked mission text.
export function useHomeMotion() {
  const workSection = ref(null);
  const mission = ref(null);
  const frame = ref(0);
  const progress = ref(0);
  const rotation = ref(0);
  const reducedMotion = ref(false);
  const motionOverride = ref(false);
  const copyScale = ref(1);
  let observer;
  let timer;
  let raf;
  let visible = false;
  let motion;

  const stop = () => {
    clearInterval(timer);
    timer = undefined;
  };
  const sync = () => {
    stop();
    if (
      visible && !document.hidden &&
      (!reducedMotion.value || motionOverride.value)
    ) {
      timer = setInterval(() => {
        frame.value += 1;
      }, 4200);
    }
    update();
  };
  const update = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = undefined;
      if (!mission.value) return;
      const top = mission.value.getBoundingClientRect().top;
      const first = mission.value.querySelector?.(".mission-first");
      const games = mission.value.querySelector?.(".games-word");
      if (first && games && first.scrollWidth) {
        copyScale.value = Math.min(1, games.offsetLeft / first.scrollWidth);
      }
      // Color changes are safe in reduced-motion mode. Never skip directly to
      // the final frame: the grid reveal is driven by the user's own scroll.
      progress.value = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight * 0.9 - top) / (window.innerHeight * 0.55),
        ),
      );
      rotation.value = reducedMotion.value && !motionOverride.value
        ? 0
        : progress.value * 360;
    });
  };
  const preferenceChanged = () => {
    reducedMotion.value = motion.matches;
    motionOverride.value = false;
    sync();
  };
  const toggleMotion = () => {
    motionOverride.value = !motionOverride.value;
    sync();
  };

  onMounted(() => {
    motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.value = motion.matches;
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(workSection.value);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", preferenceChanged);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    document.fonts?.ready.then(update);
  });
  onBeforeUnmount(() => {
    stop();
    observer?.disconnect();
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", sync);
    motion?.removeEventListener("change", preferenceChanged);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });
  return {
    workSection, mission, frame, progress, rotation, copyScale,
    reducedMotion, motionOverride, toggleMotion,
  };
}
