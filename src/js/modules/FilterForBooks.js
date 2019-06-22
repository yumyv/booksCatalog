import Module from '../modules/Module';

class FilterForBooks extends Module {
  constructor(selector) {
    super(selector);
  }

  onComponentsLoading() {
    this.input = document.querySelector('#filters');
  }

  onBindEvents() {
    this.input.addEventListener('keyup', () => {
      this.filterFromInput();
    });
  }

  filterFromInput() {
    const LENGTH_FOR_START_FILTER = 2;
    const regPhraseName = new RegExp(this.input.value, 'i');

    if (this.input.value.length > LENGTH_FOR_START_FILTER) {
      this.filter(regPhraseName);
    } else {
      for (let i = 0; i < this.container.children.length; i++) {
        this.container.children[i].style.display = '';
      }
    }
  }

  filter(regPhraseName) {
    let flagName = false;
    for (let i = 0; i < this.container.children.length; i++) {
      if (this.container.children[i]
        .querySelector('.book__heading')) {
        flagName = regPhraseName.test(this.container.children[i]
          .querySelector('.book__heading').innerText);
      }
      if (flagName) {
        this.container.children[i].style.display = '';
      } else {
        this.container.children[i].style.display = 'none';
      }
    }
  }
}

export default FilterForBooks;
