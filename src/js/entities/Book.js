class Book {
  constructor(book) {
    this.book = book;
  }

  bookImg() {
    const img = createDOMElem('img', 'book__img');
    img.setAttribute('src', `${this.book.mainPhoto}`);
    img.setAttribute('alt', `${this.book.name}`);
    return img;
  }

  bookContainer() {
    const container = createDOMElem('div', 'book__container');

    const createTextHeading = (text) => {
      const textHeading = createDOMElem(
        'p', 'book__text', 'book__text--heading');
      textHeading.innerText = text;
      container.append(textHeading);
    };
    const createText = (text) => {
      const textContainer = createDOMElem('p', 'book__text');
      textContainer.innerText = text;
      container.append(textContainer);
    };

    createTextHeading('Book\'s name:');
    const bookHeading = createDOMElem('h3', 'book__heading');
    bookHeading.innerText = `${this.book.name}`;
    container.append(bookHeading);

    createTextHeading('Book authors:');
    createText(`${this.book.authors}`);

    createTextHeading('Date of publishing:');
    createText(`${this.book.date}`);

    createTextHeading('Publisher names:');
    createText(`${this.book.publisher}`);

    createTextHeading('Publishing address:');
    createText(`${this.book.address}`);

    createTextHeading('Publisher\'s phone:');
    createText(`${this.book.phone}`);

    createTextHeading('Book categories:');
    createText(`${this.book.categories}`);

    const booksButtons = createDOMElem('div', 'book__buttons');

    const deleteBtn = createDOMElem('img', 'book__btn', 'book__btn--delete');
    deleteBtn.setAttribute('src', './img/delete.svg');
    deleteBtn.setAttribute('alt', 'delete');

    const editBtn = createDOMElem('img', 'book__btn', 'book__btn--edit');
    editBtn.setAttribute('src', './img/edit.svg');
    editBtn.setAttribute('alt', 'edit');

    const viewBtn = createDOMElem('img', 'book__btn', 'book__btn--view');
    viewBtn.setAttribute('src', './img/view.svg');
    viewBtn.setAttribute('alt', 'view');

    booksButtons.append(deleteBtn);
    booksButtons.append(editBtn);
    booksButtons.append(viewBtn);
    container.append(booksButtons);
    return container;
  }

  asElement() {
    const book = createDOMElem('div', 'book');
    book.dataset.id = `${this.book.id}`;
    book.append(this.bookImg());
    book.append(this.bookContainer());
    return book;
  }
}
