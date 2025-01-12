export default class Section {
  constructor( renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItems(item) {
    this._container.prepend(item);
  }

  renderItems(input) {
    input.forEach((item) => {
      this._renderer(item);
    });
  }
}
