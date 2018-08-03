"use strict";

const pages = [
  { path: "/creator", component: Creator, title: "Криэйтор" },
  { path: "/fortune", component: Fortune, title: "Гадалка" },
  { path: "/", component: Essay, title: "Рефераты" },
];

class Links {
  static getLinks() {
    return pages;
  }
}
