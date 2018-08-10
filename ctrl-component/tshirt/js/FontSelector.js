"use strict";

const FontSelector = ({ fonts, selectedFont, onSelect }) => {

  const getLettersOnly = (text) => {
    const re = /[^a-zA-Z]+/g;
    return text.slice(0).replace(re, '');
  }

  const handleFontSelect = event => {
    onSelect(fonts.find((el) => { return el.name === event.currentTarget.value }));
  };

  return (
    <div className="font-picker">
      {fonts.map((font, i) => {
        return (
          <div className="grid center font-item">
            <input
              type="radio"
              name="font"
              value={font.name}
              id={font.name}
              onChange={handleFontSelect}
              checked={selectedFont && selectedFont.name === font.name}
            />
            <label htmlFor={font.name} class="grid-1">
              <PictureFont
                text={getLettersOnly(font.name)}
                path={font.path}
              />
            </label>
          </div>)
      })}
    </div>
  );
}
