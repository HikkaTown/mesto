

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
    this._initialArray = items;
    this._renderer = renderer;
  }

  rendererItems = () => {
    this._initialArray.reverse().forEach(element => {
      this._renderer(element);
    });
  }

  addItem = (element) => {
    this._containerSelector.prepend(element);
  }
}