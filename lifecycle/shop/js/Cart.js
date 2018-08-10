class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isOpen: false,
    //   itemsCount: 0
    // };
  }

  opened = false;
  itemsCount = 0;

  render() {
    console.log('render');
    return <CartView { ...this.props}/>;
  }

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen,
      itemsCount: this.props.items.length
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.updateOpen = nextProps.isOpen !== this.state.isOpen;
  //   this.updateItemsCount = nextProps.items.length !== this.state.itemsCount;
  //   if (this.updateOpen || this.updateItemsCount) {
  //     this.setState({
  //       isOpen: nextProps.isOpen,
  //       itemsCount: nextProps.items.length
  //     });
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    const updateOpen = nextProps.isOpen !== this.opened;
    const updateItemsCount = nextProps.items.length !== this.itemsCount;
    this.opened = nextProps.isOpen;
    this.itemsCount = nextProps.items.length;
    console.log('updateOpen ' + updateOpen);
    console.log('updateItemsCount ' + updateItemsCount);
    console.log('opened ' + this.opened);
    console.log('itemsCount ' + this.itemsCount);
    if (updateOpen || (updateItemsCount && !updateOpen && this.opened)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateOpen = false;
  }
}