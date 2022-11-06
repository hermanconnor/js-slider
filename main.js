const initApp = () => {
  const prevButton = document.querySelector('.carousel__button--left');
  const nextButton = document.querySelector('.carousel__button--right');
  const track = document.querySelector('.carousel__track');
  const slides = [...track.querySelectorAll('.carousel__slide')];
  const dotsNav = document.querySelector('.carousel__nav');

  const slideWidth = slides[0].getBoundingClientRect().width;

  // Set Slide Positions
  setSlidePosition(slides, slideWidth);

  // Create Slide Indicator Dots
  createDots(slides, dotsNav);

  // Set active Style for Initial Dot
  const indicators = [...document.querySelectorAll('.carousel__indicator')];
  indicators[0].classList.add('current-slide');

  prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);

    hideArrows(slides, prevButton, nextButton, prevIndex);
  });

  nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

    hideArrows(slides, prevButton, nextButton, nextIndex);
  });

  dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = indicators.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);

    hideArrows(slides, prevButton, nextButton, targetIndex);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

// FUNCTIONS
const setSlidePosition = (slides, width) => {
  slides.forEach((slide, index) => {
    slide.style.left = `${index * width}px`;
  });
};

const createDots = (slides, parentEl) => {
  for (let i = 0; i < slides.length; i++) {
    const indicatorButton = document.createElement('button');
    indicatorButton.className = 'carousel__indicator';

    parentEl.append(indicatorButton);
  }
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};
