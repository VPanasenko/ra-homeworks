class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      itemsCount: 0
    };
  }

  updateOpen = false;
  updateItemsCount = false;

  render() {
    return <CartView {...this.props} />;
  }

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen,
      itemsCount: this.props.items.length
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateOpen = nextProps.isOpen !== this.state.isOpen;
    this.updateItemsCount = nextProps.items.length !== this.state.itemsCount;
    if (this.updateOpen || this.updateItemsCount) {
      this.setState({
        isOpen: nextProps.isOpen,
        itemsCount: nextProps.items.length
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.updateOpen ||
      (this.updateItemsCount && !this.updateOpen && this.state.isOpen)
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.update = false;
  }
}
