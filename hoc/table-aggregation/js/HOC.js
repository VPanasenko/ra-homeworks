"use strict";

prepareMonthData.monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

function addIfExists(itemToCheck, arr, comparer) {
  let existedItemIndex = arr.findIndex(el => {
    return comparer(itemToCheck, el);
  });
  if (existedItemIndex !== -1) {
    arr[existedItemIndex].amount += itemToCheck.amount;
  } else {
    arr.push(itemToCheck);
  }
}

function prepareMonthData(data) {
  let newData = [];
  data.map((item, index) => {
    let d = new Date(item.date);
    let newItem = {
      year: d.getFullYear(),
      month: prepareMonthData.monthNames[d.getMonth()],
      amount: item.amount
    };
    addIfExists(newItem, newData, function(newItem, checkedItem) {
      return (
        newItem.year === checkedItem.year && newItem.month === checkedItem.month
      );
    });
  });
  return newData;
}

function prepareYearData(data) {
  let newData = [];
  data.map((item, index) => {
    let newItem = {
      year: new Date(item.date).getFullYear(),
      amount: item.amount
    };
    addIfExists(newItem, newData, function(newItem, checkedItem) {
      return newItem.year === checkedItem.year;
    });
  });
  return newData;
}

function sortData(data) {
  let newData = data.slice(0);
  newData.sort(function(f, s) {
    let fDate = new Date(f.date);
    let sDate = new Date(s.date);
    if (fDate > sDate) return 1;
    if (fDate < sDate) return -1;
    return 0;
  });
  return newData;
}

const prepareData = (Component, operation, property) => {
  return function(...args) {
    const slicedArgs = args.slice(0);
    let props = slicedArgs[0];
    props[property] = operation(props[property]);
    return Component(...slicedArgs);
  };
};

const SortTableDecorated = prepareData(SortTable, sortData, "list");
const MonthTableDecorated = prepareData(MonthTable, prepareMonthData, "list");
const YearTableDecorated = prepareData(YearTable, prepareYearData, "list");
