class AddBooksOnPage extends Module {
  constructor(selector) {
    super(selector);
  }

  onComponentsLoading() {
    this.booksContainer = document.querySelector('.books__wrapper');
  }

  onCreate() {
    const promise = new Promise((resolve) => {
      resolve(BookApi.getAll());
    });
    promise.then((books) => {
      for (let i = 0; i < books.length; i++) {
        this.booksContainer.append(new Book(books[i]).asElement());
      }
    });
  }
}
