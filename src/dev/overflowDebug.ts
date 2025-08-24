export function logOverflowingNodes() {
  const vw = document.documentElement.clientWidth;
  const bad: Element[] = [];
  document.querySelectorAll<HTMLElement>("*").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right - vw > 1) bad.push(el);
  });
  console.log("Overflowing nodes:", bad);
}
