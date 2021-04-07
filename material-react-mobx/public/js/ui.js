const isMobile = window.innerWidth <= 1024;
(function (w, d) {
  // main swiper
  var sectionSwiper1 = new Swiper('#section1 .swiper-container', {
    speed: 1000,
    autoplay: {
      delay: 2000,
    },
    loop: true,
    navigation: {
      nextEl: '#section1 .swiper-button-next',
      prevEl: '#section1 .swiper-button-prev',
    },
    pagination: {
      el: '#section1 .swiper-pagination',
    },
  });
  var sectionSwiper3 = new Swiper('#section3 .swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '#section3 .swiper-button-next',
      prevEl: '#section3 .swiper-button-prev',
    },
    pagination: {
      el: '#section3 .swiper-pagination',
    },
  });
  var sectionSwiper4 = new Swiper('#section4 .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 60,
        slidesPerGroup: 3,
      },
    },
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '#section4 .swiper-button-next',
      prevEl: '#section4 .swiper-button-prev',
    },
    pagination: {
      el: '#section4 .swiper-pagination',
    },
  });

  // init
  mobileGnb();
  gnbOver();
  // mainMotion();
})(window, document, undefined);

/**
 * mobile gnb toggle
 */
function mobileGnb() {
  if (!isMobile) return;
  const header = document.querySelector('.app-header');
  const btnHamburger = document.querySelector('.btn-hamburger');
  btnHamburger.addEventListener(
    'click',
    () => {
      header.classList.toggle('is-gnb-open');
    },
    false
  );
}

/**
 * gnb
 */
function gnbOver() {
  if (isMobile) return;
  const header = document.querySelector('.app-header');
  const gnb = header.querySelector('.gnb');
  gnb.addEventListener(
    'mouseover',
    () => {
      header.classList.add('is-gnb-over');
    },
    false
  );
  header.addEventListener(
    'mouseout',
    () => {
      header.classList.remove('is-gnb-over');
    },
    false
  );
}

/**
 * scroll event
 */
function mainMotion() {
  window.addEventListener(
    'scroll',
    (e) => {
      const scy = window.scrollY;
      const sections = document.querySelectorAll('.section');
      sections.forEach((item) => {
        if (scy > item.offsetTop - offsetValue) {
          item.classList.add('is-animate');
        } else {
          item.classList.remove('is-animate');
        }
      });
    },
    false
  );
}
