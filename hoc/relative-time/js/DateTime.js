"use strict";

const DateTime = props => {
  return <p className="date">{props.date}</p>;
};

const datePretty = Component => {
  return function(...args) {
    let slicedArgs = args.slice(0);
    let props = slicedArgs[0];
    props.date = getDateTimeTextedAgo(props.date);
    return Component(...slicedArgs);
  };
};

const DateTimePretty = datePretty(DateTime);
