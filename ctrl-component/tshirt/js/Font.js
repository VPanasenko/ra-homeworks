"use strict";

const Font = props => {
  const handleFontSelect = event => {
    if (inputRef !== null && inputRef != undefined) {
      props.onSelect(props.font);
    }
  };

  let inputRef = null;

  return (
    <div className="grid center font-item">
      <input
        type="radio"
        name="font"
        value={props.font.name}
        id={props.font.name}
        onChange={handleFontSelect.bind(this)}
        ref={i => (inputRef = i)}
      />
      <label htmlFor={props.font.name} class="grid-1">
        <PictureFont
          text={Utility.getLettersOnly(props.font.name)}
          path={props.font.path}
        />
      </label>
    </div>
  );
};
