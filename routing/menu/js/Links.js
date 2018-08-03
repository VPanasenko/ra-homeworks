'use strict'

const pages = [{
        path: "/",
        exact: true,
        component: HomePage,
        title: "Главная"
    },
    {
        path: "/drift",
        exact: false,
        component: DriftPage,
        title: "Дрифт-такси"
    },
    {
        path: "/timeattack",
        exact: false,
        component: TimeAttackPage,
        title: "Time Attack"
    },
    {
        path: "/forza",
        exact: false,
        component: ForzaPage,
        title: "Forza Karting"
    },
];

class Links {
    static getLinks() {
        return pages;
    }
}