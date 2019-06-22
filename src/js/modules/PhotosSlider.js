import Module from '../modules/Module';

class PhotosSlider extends Module {
  constructor(selector) {
    super(selector);
    this.isAnimation = false;
  }

  animation(startValue, endValue, time, onFrame, onend) {
    const FRAME_TIME = 15;
    const frames = time / FRAME_TIME;
    const step = (endValue - startValue) / frames;

    const up = endValue > startValue;

    const inter = setInterval(() => {
      startValue += step;
      if ((up && startValue >= endValue) || (!up && startValue <= endValue)) {
        clearInterval(inter);
        startValue = endValue;
      }
      onFrame(startValue);
      if (startValue === endValue && onend) onend();
    }, FRAME_TIME);
  }

  onComponentsLoading() {
    this.slideWrapper = document.querySelector('.photos-slider__list');
    this.leftArrow = document.querySelector('.photos-slider__prev');
    this.rightArrow = document.querySelector('.photos-slider__next');
  }

  onBindEvents() {
    this.rightArrow.addEventListener('click', () => this.animateLeft());
    this.leftArrow.addEventListener('click', () => this.animateRight());
  }

  animateLeft(onend) {
    if (this.isAnimation) return;
    this.isAnimation = true;
    this.animation(0, -50, 800,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        if (this.slideWrapper.firstElementChild) {
          this.slideWrapper.appendChild(this.slideWrapper.firstElementChild);
          this.slideWrapper.style.transform = '';
          if (onend) onend();
          this.isAnimation = false;
        }
      });
  }

  animateRight(onend) {
    if (this.isAnimation) return;
    this.isAnimation = true;
    this.slideWrapper.style.marginLeft = '-100%';
    if (this.slideWrapper.firstElementChild) {
      this.slideWrapper.insertBefore(
        this.slideWrapper.lastElementChild,
        this.slideWrapper.firstElementChild,
      );
    }
    this.animation(-100, 0, 800,
      (value) => {
        this.slideWrapper.style.marginLeft = value + '%';
      }, () => {
        if (onend) onend();
        this.slideWrapper.style.marginLeft = '';
        this.isAnimation = false;
      });
  }
}

export default PhotosSlider;
