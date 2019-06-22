class BookApi {
  static get(id) {
    return JSON.parse(localStorage.getItem(id.toString()));
  }

  static getAll() {
    const values = [];
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      if (typeof(JSON.parse(localStorage.getItem(keys[i])).id) === 'number') {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
      }
    }
    return values;
  }

  static post(obj) {
    localStorage.setItem(obj.id.toString(), JSON.stringify(obj));
  }

  static update(obj) {
    localStorage.setItem(obj.id.toString(), JSON.stringify(obj));
  }

  static delete(id) {
    localStorage.removeItem(id.toString());
  }
}
