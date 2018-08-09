"use strict";

// Здесь this === undefined, так как мы в функцию не привязываем другой this
// (не передаём другой this и не привязываем через bind);
// props.onChange(props.value) не подходит, так как в таком случае
// мы передаём назад в state родителя его же значение;
// Поэтому мы передаём родителю новое значение из target (на котором произошло событие),
// полученное от event (для чего передаём event в качестве аргумента).
const HexInput = props => {
  function onChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <input
      value={props.value}
      onChange={onChange}
      type="text"
      className="hex-field js-hex-field"
      placeholder="#000000"
    />
  );
};
