"use strict";

class FontSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "abc"
    };
  }

  render() {
    return (
      <div className="font-picker">
        {this.props.fonts.map((font, i) => {
          return <Font key={i} font={font} onSelect={this.props.onSelect}/>;
        })}
      </div>
    );
  }
}
