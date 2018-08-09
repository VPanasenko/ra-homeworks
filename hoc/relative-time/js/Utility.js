"use strict";

// Пришлось оставить функции и свойства глобальными, 
// так как не смог сделать статичными свойствами DateUtility.getDateTimeTextedAgo 
// при размещении данного кода в классе DateUtility. 
// Прошу дать совет, как это можно реализовать (обернуть данный код в класс).
getDateTimeTextedAgo.getMsInMinute = (() => {
    return 1000 * 60;
})();
getDateTimeTextedAgo.getMsInHour = (() => {
    return 1000 * 60 * 60;
})();
getDateTimeTextedAgo.getMsInDay = (() => {
    return 1000 * 60 * 60 * 24;
})();
getDateTimeTextedAgo.getTimesAndEnds = (() => {
    return [{
            timeInmSec: getDateTimeTextedAgo.getMsInDay,
            endsRus: ["дней", "день", "дня"]
        },
        {
            timeInmSec: getDateTimeTextedAgo.getMsInHour,
            endsRus: ["часов", "час", "часа"]
        },
        {
            timeInmSec: getDateTimeTextedAgo.getMsInMinute,
            endsRus: ["минут", "минута", "минуты"]
        }
    ];
})()

function getDateTimeTextedAgo(dateTime) {
    let dt = dateTime;
    if (dt) {
        dt = Date.parse(dt);
        const dtNow = Date.now();
        const diff = dtNow - dt;
        getDateTimeTextedAgo.getTimesAndEnds.some(function (el) {
            let rounded = getAbsRound(diff, el.timeInmSec);
            dt = `${rounded} ${getCorrectTextInRussian(rounded, el.endsRus)} назад`;
            return diff > el.timeInmSec;
        });
    }
    return dt;
}

function getAbsRound(division, divider) {
    return Math.abs(Math.round(division / divider));
}

function getCorrectTextInRussian(number, possibleTexts) {
    const irregularnumbers = ["11", "12", "13", "14"];
    if (!isNaN(number)) {
        let lastTwoSymbols = number.toString().slice(-2);
        if (
            irregularnumbers.some(el => {
                return lastTwoSymbols === el;
            })
        ) {
            return possibleTexts[0];
        }
        let lastSymbol = lastTwoSymbols.slice(-1);
        switch (lastSymbol) {
            case "0":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                return possibleTexts[0];
            case "1":
                return possibleTexts[1];
            case "2":
            case "3":
            case "4":
                return possibleTexts[2];
            default:
                return "";
        }
    }
    return "";
}