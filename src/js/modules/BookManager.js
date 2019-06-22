class BookManager extends Module {
  constructor(selector) {
    super(selector);
    this.isCurrentBook();
  }

  onComponentsLoading() {
    this.addBtn = document.querySelector('.add-book__btn--add');
    this.updateBtn = document.querySelector('.add-book__btn--update');
    this.morePhotoBtn = document.querySelector('.add-book__more-photo-btn');
  }

  onBindEvents() {
    this.addBtn.addEventListener('click', () => {
      this.addBook();
    });
    this.updateBtn.addEventListener('click', () => {
      this.updateBook();
    });
    this.morePhotoBtn.addEventListener('click', () => {
      this.addMorePhoto();
    });
  }

  addBook() {
    const book = {};
    book.id = Date.now();
    book.name = document.querySelector('#name').value;
    book.authors = document.querySelector('#authors').value;
    book.date = document.querySelector('#date').value;
    book.publisher = document.querySelector('#publisher').value;
    book.address = document.querySelector('#address').value;
    book.phone = document.querySelector('#phone').value;
    book.categories = document.querySelector('#categories').value;
    book.mainPhoto = document.querySelector('#main-photo').value;
    book.photos = [];

    if (document.querySelector('.add-book__photos')) {
      const photos = document.querySelector('.add-book__photos');
      const photosId = [];
      for (let i = 0; i < photos.children.length; i++) {
        if (photos.children[i].getAttribute('id')) {
          photosId.push(photos.children[i].getAttribute('id'));
        }
      }

      const addPhotos = (arrId) => {
        for (let i = 0; i < arrId.length; i++) {
          const photo = {};
          photo.id = arrId[i];
          photo.link = document.querySelector(`#${arrId[i]}`).value;
          book.photos.push(photo);
        }
      };

      addPhotos(photosId);
    }

    if (book.name && book.authors) {
      BookApi.post(book);
      return new InfoModalWindow('Book added', 2000).init();
    } else {
      return new InfoModalWindow(
        'Please, enter the name and authors for the book',
        5000).init();
    }
  }

  isCurrentBook() {
    const id = new URLSearchParams(location.search).get('id');
    if (id) {
      this.showCurrentBook(id);
    }
  }

  showCurrentBook(id) {
    document.querySelector('#id').value = id;
    const currentBook = BookApi.get(id);

    const currentBookAsElem = createDOMElem('div', 'current-book');
    currentBookAsElem.innerText = `Current book's name is ${currentBook.name}, authors is ${currentBook.authors}`;
    document.querySelector('.add-book__form')
      .firstElementChild.append(currentBookAsElem);

    document.querySelector('#name').value = `${currentBook.name}`;
    document.querySelector('#authors').value = `${currentBook.authors}`;
    document.querySelector('#date').value = `${currentBook.date}`;
    document.querySelector('#publisher').value = `${currentBook.publisher}`;
    document.querySelector('#address').value = `${currentBook.address}`;
    document.querySelector('#phone').value = `${currentBook.phone}`;
    document.querySelector('#categories').value = `${currentBook.categories}`;
    document.querySelector('#main-photo').value = `${currentBook.mainPhoto}`;

    if (currentBook.photos) {
      this.showCurrentPhotos(currentBook);
    }
  }

  showCurrentPhotos(currentBook) {
    for (let i = 0; i < currentBook.photos.length; i++) {
      if (!document.querySelector('.add-book__photos')) {
        const photosContainer = createDOMElem('div', 'add-book__photos');
        const bookLabel = createDOMElem('label', 'add-book__label');
        bookLabel.innerText = 'Link for additional book photo:';
        bookLabel.setAttribute('for', currentBook.photos[i].id);

        const bookInput = createDOMElem('input', 'add-book__input');
        bookInput.innerText = 'Link for additional book photo:';
        bookInput.setAttribute('type', 'url');
        bookInput.setAttribute('id', currentBook.photos[i].id);

        bookInput.value = currentBook.photos[i].link;

        photosContainer.append(bookLabel);
        photosContainer.append(bookInput);
        document.querySelector('.add-book__more-photo').insertAdjacentElement(
          'beforebegin', photosContainer);
      } else {
        const photosContainer = document.querySelector('.add-book__photos');
        const bookLabel = createDOMElem('label', 'add-book__label');
        bookLabel.innerText = 'Link for additional book photo:';
        bookLabel.setAttribute('for', currentBook.photos[i].id);

        const bookInput = createDOMElem('input', 'add-book__input');
        bookInput.innerText = 'Link for additional book photo:';
        bookInput.setAttribute('type', 'url');
        bookInput.setAttribute('id', currentBook.photos[i].id);

        bookInput.value = currentBook.photos[i].link;

        photosContainer.append(bookLabel);
        photosContainer.append(bookInput);
      }
    }
  }

  updateBook() {
    const book = {};
    book.id = parseInt(document.querySelector('#id').value);
    book.name = document.querySelector('#name').value;
    book.authors = document.querySelector('#authors').value;
    book.date = document.querySelector('#date').value;
    book.publisher = document.querySelector('#publisher').value;
    book.address = document.querySelector('#address').value;
    book.phone = document.querySelector('#phone').value;
    book.categories = document.querySelector('#categories').value;
    book.mainPhoto = document.querySelector('#main-photo').value;
    book.photos = [];

    const photos = document.querySelector('.add-book__photos');
    const photosId = [];
    if (photos) {
      for (let i = 0; i < photos.children.length; i++) {
        if (photos.children[i].getAttribute('id')) {
          photosId.push(photos.children[i].getAttribute('id'));
        }
      }
    }

    const addPhotos = (arrId) => {
      for (let i = 0; i < arrId.length; i++) {
        const photo = {};
        photo.id = arrId[i];
        photo.link = document.querySelector(`#${arrId[i]}`).value;
        if (photo.link) {
          book.photos.push(photo);
        }
      }
    };

    addPhotos(photosId);

    if (book.id && book.name && book.authors) {
      BookApi.update(book);
      return new InfoModalWindow('Book edited', 2000).init();
    } else {
      return new InfoModalWindow(
        'Please, enter the id, name and authors for the book',
        5000).init();
    }
  }

  addMorePhoto() {
    if (!document.querySelector('.add-book__photos')) {
      const id = `id${Date.now()}`;
      const photosContainer = createDOMElem('div', 'add-book__photos');
      const bookLabel = createDOMElem('label', 'add-book__label');
      bookLabel.innerText = 'Link for additional book photo:';
      bookLabel.setAttribute('for', id);

      const bookInput = createDOMElem('input', 'add-book__input');
      bookInput.innerText = 'Link for additional book photo:';
      bookInput.setAttribute('type', 'url');
      bookInput.setAttribute('id', id);

      photosContainer.append(bookLabel);
      photosContainer.append(bookInput);
      document.querySelector('.add-book__more-photo').insertAdjacentElement(
        'beforebegin', photosContainer);
    } else {
      const id = `id${Date.now()}`;
      const photosContainer = document.querySelector('.add-book__photos');
      const bookLabel = createDOMElem('label', 'add-book__label');
      bookLabel.innerText = 'Link for additional book photo:';
      bookLabel.setAttribute('for', id);

      const bookInput = createDOMElem('input', 'add-book__input');
      bookInput.innerText = 'Link for additional book photo:';
      bookInput.setAttribute('type', 'url');
      bookInput.setAttribute('id', id);

      photosContainer.append(bookLabel);
      photosContainer.append(bookInput);
    }
  }
}
