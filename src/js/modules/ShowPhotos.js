import BookApi from '../api/BookApi';
import Module from '../modules/Module';
import createDOMElem from '../createDOMElem';
import PhotosSlider from '../modules/PhotosSlider';

class ShowPhotos extends Module {
  constructor(selector) {
    super(selector);
  }

  onComponentsLoading() {
    this.selectorList = document.querySelector('.books__wrapper');
  }

  onBindEvents() {
    this.selectorList.addEventListener('click', (e) => {
      this.showPhotos(e);
    });
  }

  newEvents() {
    this.closeBtn.addEventListener('click', () => {
      document.body.removeChild(document.querySelector('.fade'));
    });
  }

  showPhotos(e) {
    if (e.target.closest('.book__btn--view')) {
      const id = e.target.closest('.book').getAttribute('data-id');
      const book = BookApi.get(id);

      if (!document.querySelector('.fade')) {
        const fade = createDOMElem('div', 'fade');
        const photosSlider = createDOMElem('div', 'photos-slider');
        const list = createDOMElem('ul', 'photos-slider__list');

        for (let i = 0; i < book.photos.length; i++) {
          const item = createDOMElem('li', 'photos-slider__item');
          const img = createDOMElem('img', 'photos-slider__img');
          img.setAttribute('src', book.photos[i].link);
          img.setAttribute('alt', book.name);
          item.append(img);
          list.append(item);
        }

        photosSlider.append(list);

        const prevArrow = createDOMElem('img', 'photos-slider__prev');
        prevArrow.setAttribute('src', './img/prev.svg');
        prevArrow.setAttribute('alt', 'prev');
        const nextArrow = createDOMElem('img', 'photos-slider__next');
        nextArrow.setAttribute('src', './img/next.svg');
        nextArrow.setAttribute('alt', 'next');
        this.closeBtn = createDOMElem('img', 'photos-slider__close');
        this.closeBtn.setAttribute('src', './img/close.svg');
        this.closeBtn.setAttribute('alt', 'close');

        photosSlider.append(prevArrow);
        photosSlider.append(nextArrow);
        photosSlider.append(this.closeBtn);
        fade.append(photosSlider);
        document.body.append(fade);

        this.newEvents();

        return new PhotosSlider('.photos-slider').init();
      }
    }
  }
}

export default ShowPhotos;
