// Scroll halus lewat Lenis (instance disimpan di window oleh SmoothScroll)
export const scrollTo = (target, duration = 1.6) => window.__lenis?.scrollTo(target, { duration })

// Pasang di <a href="#id">: klik -> scroll halus, bukan lompat
export function anchorClick(e) {
  const href = e.currentTarget.getAttribute('href')
  if (href && href.length > 1 && href[0] === '#') {
    e.preventDefault()
    scrollTo(href)
  }
}
