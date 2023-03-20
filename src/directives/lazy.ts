export const vLazy = {
  mounted: (el: HTMLImageElement) => {
    const io = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          img.setAttribute("src", src!);
          img.classList.toggle("opacity-0");
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );
    io.observe(el);
  },
};
