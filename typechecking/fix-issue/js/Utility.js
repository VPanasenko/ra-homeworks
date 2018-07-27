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

const versionPropType = (props, propName, componentName) => {
    const re = /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$/;
    return checkPropTypeByRegex(props, propName, componentName, re, 'xx.xx.xx where x is number');
}

const emailPropType = (props, propName, componentName) => {
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript   
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return checkPropTypeByRegex(props, propName, componentName, re, 'a@a.com');
}

function checkPropTypeByRegex(props, propName, componentName, regexExpression, correctExample){
    const p = props[propName];
    if (!regexExpression.test(p)) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Received value '${props[propName]}'. Expecting something like '${correctExample}'. Validation failed.`);
    }
    return null;
}

const versionPropTypeChecker = createChainableTypeChecker(versionPropType);
const emailPropTypeChecker = createChainableTypeChecker(emailPropType);