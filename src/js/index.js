import AddBooksOnPage from './modules/AddBooksOnPage';
import BookManager from './modules/BookManager';
import FilterForBooks from './modules/FilterForBooks';
import DeleteBook from './modules/DeleteBook';
import EditBook from './modules/EditBook';
import ShowPhotos from './modules/ShowPhotos';

class Page {
  constructor() {
    this.modules = [];
  }

  registerModule(module) {
    this.modules.push(module);
  }

  init() {
    this.modules.forEach((m) => {
      m.init();
    });
  }

  start() {
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }
}

const page = new Page();
if (document.querySelector('.add-book')) {
  page.registerModule(new BookManager('.add-book'));
}
if (document.querySelector('.books')) {
  page.registerModule(new AddBooksOnPage('.books'));
}
if (document.querySelector('.filters')) {
  page.registerModule(new FilterForBooks('.books__wrapper'));
}
if (document.querySelector('.books__wrapper')) {
  page.registerModule(new DeleteBook('.books__wrapper'));
}
if (document.querySelector('.books__wrapper')) {
  page.registerModule(new EditBook('.books__wrapper'));
}
if (document.querySelector('.books__wrapper')) {
  page.registerModule(new ShowPhotos('.books__wrapper'));
}
page.start();
