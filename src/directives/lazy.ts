import type { Directive } from "vue";

const io = new IntersectionObserver(handleIntersection, { threshold: 0.25 });

function handleIntersection(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      const img = entry.target;
      const src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
      img.setAttribute("src", src!);
      img.classList.toggle("opacity-0");
      observer.unobserve(entry.target);
    }
  });
}

export const vLazy: Directive<HTMLImageElement> = {
  mounted: (el) => {
    io.observe(el);
  },
  unmounted: (el) => {
    io.unobserve(el);
  },
};
