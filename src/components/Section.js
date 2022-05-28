export default class Section {
  constructor ( { renderer }, containerSelector) {
    // функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
    // контейнер, в который нужно добавлять созданные элементы
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка всех элементов
  renderAllItems(items) {
    items.forEach ( (item) => {
      this._renderer(item);
    })
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}