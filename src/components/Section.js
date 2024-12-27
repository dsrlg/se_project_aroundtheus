export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  addItems(item) {
    this._container.append(item);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //data.forEach((cardData) => rendercard(cardData, cardsWrap));

  //function rendercard(cardData, wrapper) {
  //const cardElement = createCard(cardData);
  //wrapper.prepend(cardElement);
  // function createCard(item) {
  //   const card = new Card(item, "#card-template", handleImageClick);
  //   return card.getView();
  // }
}
