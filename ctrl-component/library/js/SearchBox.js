'use strict'

const SearchBox = (props) => {
    let handleInput = (event) => {
        props.filterBooks(event.currentTarget.value);
    }

    return (
        <input
            type="text"
            value={props.value}
            placeholder="Поиск по названию или автору"
            onChange={handleInput}
        />
    );
};