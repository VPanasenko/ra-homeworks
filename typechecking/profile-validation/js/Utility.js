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
        errorText = ` Expecting something like '12/31/2018'. `;
    } else {
        if (isNaN(new Date(date))) {
            correct = false;
            errorText = ` Expecting something like '12/31/2018'. `;
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
    else{
        const re = /^((0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d)|((0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d)|((19|20)\d\d[- /.](0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012]))|((19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]))$/;
        return checkPropTypeByRegex(props, propName, componentName, re, '12/31/2018 or 31/12/2018 or 2018/31/12 or 2018/12/31; also - and . may be used as separators');
    }
}

function checkPropTypeByRegex(props, propName, componentName, regexExpression, correctExample) {
    const p = props[propName];
    if (!regexExpression.test(p)) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Received value '${props[propName]}'. Expecting something like '${correctExample}'. Validation failed.`);
    }
    return null;
}

const urlPropTypeChecker = createChainableTypeChecker(urlPropType);
const datePropTypeChecker = createChainableTypeChecker(datePropType);