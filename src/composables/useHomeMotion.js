import { onMounted, onBeforeUnmount, ref } from "vue";

// Pause the fixed-frame carousel while it is offscreen or the tab is hidden.
export function useHomeMotion() {
  const workSection = ref(null);
  const carouselRunning = ref(false);
  let observer;
  let visible = false;

  const sync = () => {
    carouselRunning.value =
      visible && !document.hidden;
  };

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(workSection.value);
    document.addEventListener("visibilitychange", sync);
  });
  onBeforeUnmount(() => {
    carouselRunning.value = false;
    observer?.disconnect();
    document.removeEventListener("visibilitychange", sync);
  });
  return {
    workSection, carouselRunning,
  };
}
