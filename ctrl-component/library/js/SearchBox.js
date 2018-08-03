class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.value);
    }

    inputRef = null;

    filter = () => {
        if (this.inputRef) {
            this.props.filterBooks(this.inputRef.value);
        }
    }

    render() {
        return (
            <div>
                <input type="text"
                    placeholder="Поиск по названию или автору"
                    ref={i => this.inputRef = i}
                    value={this.props.value}
                    onChange={this.filter}
                />
            </div>
        );
    }
};