'use strict'

const getLettersOnly = (text) => {
    const re = /[^a-zA-Z]+/g;
    return text.slice(0).replace(re, '');
}

class Utility{
    static getLettersOnly(text){
        return getLettersOnly(text);
    }
}