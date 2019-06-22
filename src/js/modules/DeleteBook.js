import BookApi from '../api/BookApi';
import Book from '../entities/Book';
import Module from '../modules/Module';

class DeleteBook extends Module {
  constructor(selector) {
    super(selector);
  }

  onComponentsLoading() {
    this.selectorList = document.querySelector('.books__wrapper');
  }

  onBindEvents() {
    this.selectorList.addEventListener('click', (e) => {
      this.deleteBook(e);
    });
  }

  deleteBook(e) {
    if (e.target.closest('.book__btn--delete')) {
      const id = e.target.closest('.book').getAttribute('data-id');
      BookApi.delete(id);
      this.updateView();
    }
  }

  updateView() {
    this.selectorList.innerHTML = '';
    const books = BookApi.getAll();
    for (let i = 0; i < books.length; i++) {
      this.selectorList.append(new Book(books[i]).asElement());
    }
  }
}

export default DeleteBook;
