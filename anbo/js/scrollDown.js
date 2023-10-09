let start, elemTop, startTime;

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function smoothScroll(timestamp) {
    if (startTime === undefined) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const scrollY = easeInOutQuad(elapsed, start, elemTop - start, 1000);

    window.scrollTo(0, scrollY);

    if (elapsed < 1000) {
        requestAnimationFrame(smoothScroll);
    }
}

function SmoothVerticalScrolling(e) {
    start = window.scrollY;
    elemTop = e.getBoundingClientRect().top + start;
    startTime = undefined;
    requestAnimationFrame(smoothScroll);
}

function SVS_B(eAmt, where) {
  if(where == "center" || where == "")
      window.scrollBy(0, eAmt / 2);
  if (where == "top")
      window.scrollBy(0, eAmt);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {

          SmoothVerticalScrolling(target, 500, "top");
      }
  });
});
