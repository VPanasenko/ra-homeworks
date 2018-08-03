'use strict';

class FontSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
        }
    }
    
    componentWillMount () {
        this.getName();
        console.log(this.props);
    }

    getName = () => {
        if (this.props.fonts && this.props.fonts.length > 0) {
            if (this.props.selectedFont && this.props.selectedFont != null) {
                this.setState({ name: this.props.selectedFont.name });
            }
            else {
                this.setState({ name: this.props.fonts[0].name });
            }
        }
        return this.state.name;
    }

    grid = () => {
        return (<div className="grid center font-item">
            <input
                type="radio"
                name="font"
                value={this.state.name}
                id={this.state.name}
            />
            <label htmlFor={this.state.name} class="grid-1">
                {this.props.fonts.map((font, i) => {
                    return (
                        <PictureFont
                            key={i}
                            text={font.name}
                            path={font.path}
                        />
                    )
                })}
            </label>
        </div>)
    }

    render() {
        return (
            <div className="font-picker">
                {this.grid}
            </div>
        )
    }
};