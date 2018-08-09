"use strict";

const datePretty = Component => {
  function DatePretty(...args) {
    let slicedArgs = args.slice(0);
    let props = slicedArgs[0];
    props.date = getDateTimeTextedAgo(props.date);
    return Component(...slicedArgs);
  };

  const componentName = Component.displayName || Component.name || "Component";
  DatePretty.displayName = `datePretty(${componentName})`;

  return DatePretty;
};

const DateTimePretty = datePretty(DateTime);
