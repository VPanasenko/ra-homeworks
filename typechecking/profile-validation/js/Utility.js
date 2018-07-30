'use strict';

const createChainableTypeChecker = (validate) => {
    const checkType = (isRequired, props, propName, componentName) => {
        const p = props[propName];
        if ((p === undefined) || (p === null)) {
            if (isRequired) {
                {
                    return new Error(`The prop '${propName}' is marked as required in '${componentName}', but its value is '${p}'.`);
                }
                return null;
            }
        }
        else {
            return validate(props, propName, componentName);
        }
    }
    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
}

const urlPropType = (props, propName, componentName) => {
    const re = /^https:\/\/vk\.com\/(id[0-9]+|[A-Za-z0-9_-]+)$/;
    return checkPropTypeByRegex(props, propName, componentName, re, 'https://vk.com/user123-_');
}

const datePropType = (props, propName, componentName) => {
    //https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format
    //https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    const date = new Date(props[propName]);
    let correct = true;
    let errorText = '';
    if (!(date instanceof Date)) {
        correct = false;
        errorText = ` Expecting something like '2018-12-31'. `;
    } else {
        if (isNaN(new Date(date))) {
            correct = false;
            errorText = ` Expecting something like '2018-12-31'. `;
        } else {
            if (Date.now() < date) {
                correct = false;
                errorText = ` Received date is greater than today'. `;
            }
        }
    }

    if (!correct) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Received value '${props[propName]}'.'${errorText}'Validation failed.`);
    }
    else {
        const re = /^((19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01]))$/;
        return checkPropTypeByRegex(props, propName, componentName, re, `2018-12-31 and '-' as separator`);
    }
}

function checkPropTypeByRegex(props, propName, componentName, regexExpression, correctExample) {
    const p = props[propName];
    if (!regexExpression.test(p)) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Received value '${props[propName]}'. Expecting something like '${correctExample}'. Validation failed.`);
    }
    return null;
}

function formatDate(dateObj) {
    if ((dateObj === null) || (dateObj === undefined)) {
        return null;
    }

    const date = new Date(dateObj);
    if (!isNaN(date)) {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();

        return `${y}-${m < 10 ? '0' + m : m}-${d}`;
    }
    else {
        return null;
    }
}

const urlPropTypeChecker = createChainableTypeChecker(urlPropType);
const datePropTypeChecker = createChainableTypeChecker(datePropType);