class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  SearchBoxViewRef = null;

  setSearchBoxViewRef = (ref) => {
    this.SearchBoxViewRef = ref;
  }
  
  isFixed = () => {
    return this.SearchBoxViewRef.getBoundingClientRect().top <= 0;
  }

  setPosition = () => {
    this.setState({ fixed: this.isFixed() });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.setPosition);
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} setRef={this.setSearchBoxViewRef}/>;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setPosition);
  }
}
