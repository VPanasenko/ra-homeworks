"use strict";

//Для свойства position такой разброс, чтобы можно было вставить промежуточные без сдвига существующих.
const pages = [
  { path: "/", exact: true, component: Essay, title: "Рефераты", position: 0 },
  { path: "/creator", exact: false, component: Creator, title: "Криэйтор", position: 100 },
  { path: "/fortune", exact: false, component: Fortune, title: "Гадалка", position: 200 },
];

class Links {
  static getLinks() {
    return pages;
  }
  static getSortedByPosition() {
    return pages.slice(0).sort(function (a, b) {
      return a['position'] - b['position'];
    })
  }
}
