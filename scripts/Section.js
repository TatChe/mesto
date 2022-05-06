export default class Section {
  constructor ( { items, renderer}, containerSelector) {
    // массив данных, которые нужно добавить на страницу при инициализации класса
    this._items = items;
    // функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
    // контейнер, в который нужно добавлять созданные элементы
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка всех элементов
  renderAllItems () {
    this._items.forEach ( (item) => {
      this._renderer(item);
    })
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem (item) {
    this._container.prepend(item);
  }
}