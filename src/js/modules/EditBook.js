import Module from '../modules/Module';

class EditBook extends Module {
  constructor(selector) {
    super(selector);
    this.checkUrl();
  }

  checkUrl() {
    const exist = /index.html/i.test(window.location.href);
    if (exist) {
      this.url = window.location.href.replace(/index.html/i, 'addBook.html');
    } else {
      this.url = `${window.location.href}addBook.html`;
    }
  }

  onComponentsLoading() {
    this.selector = document.querySelector('.books__wrapper');
  }

  onBindEvents() {
    this.selector.addEventListener('click', (e) => {
      this.editBook(e);
    });
  }

  editBook(e) {
    if (e.target.closest('.book__btn--edit')) {
      const id = e.target.closest('.book').getAttribute('data-id');
      const url = new URL(this.url);
      const params = new URLSearchParams(location.search);
      params.set('id', id);
      url.search = params.toString();
      window.location.href = url.toString();
    }
  }
}

export default EditBook;
