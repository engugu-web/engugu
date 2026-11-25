import { onMounted, onBeforeUnmount, ref } from "vue";

// The carousel follows visibility; mission artwork shares the GAMES timeline.
export function useHomeMotion() {
  const workSection = ref(null);
  const mission = ref(null);
  const carouselRunning = ref(false);
  const progress = ref(0);
  const rotation = ref(0);
  const copyScale = ref(1);
  let observer;
  let raf;
  let visible = false;
  const setMissionProgress = (value) => {
    progress.value = Math.max(0, Math.min(1, value));
    rotation.value = progress.value * 360;
  };

  const sync = () => {
    carouselRunning.value =
      visible && !document.hidden;
    update();
  };
  const update = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = undefined;
      if (!mission.value) return;
      const first = mission.value.querySelector?.(".mission-first");
      const games = mission.value.querySelector?.(".games-word");
      if (first && games && first.scrollWidth) {
        copyScale.value = Math.min(1, games.offsetLeft / first.scrollWidth);
      }
    });
  };

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(workSection.value);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    document.fonts?.ready.then(update);
  });
  onBeforeUnmount(() => {
    carouselRunning.value = false;
    observer?.disconnect();
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });
  return {
    workSection, mission, carouselRunning, progress, rotation, copyScale, setMissionProgress,
  };
}
