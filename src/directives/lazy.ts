import type { Directive } from "vue";

const io = new IntersectionObserver(handleIntersection, { threshold: 0.25 });

function handleImageLoading(e: Event) {
  if (e.target instanceof Element) {
    e.target.classList.toggle("opacity-0");
  }
}

function handleIntersection(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      const src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
      img.addEventListener("load", handleImageLoading);
      img.setAttribute("src", src!);
      observer.unobserve(img);
    }
  });
}

export const vLazy: Directive<HTMLImageElement> = {
  mounted: (el) => {
    io.observe(el);
  },
  unmounted: (el) => {
    io.unobserve(el);
    el.removeEventListener("load", handleImageLoading);
  },
};
