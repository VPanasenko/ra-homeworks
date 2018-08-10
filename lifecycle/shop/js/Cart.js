class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  opened = false;
  itemsCount = 0;

  render() {
    return <CartView {...this.props} />;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updateOpen = nextProps.isOpen !== this.opened;
    const updateItemsCount = nextProps.items.length !== this.itemsCount;
    this.opened = nextProps.isOpen;
    this.itemsCount = nextProps.items.length;
    if (updateOpen || (updateItemsCount && !updateOpen && this.opened)) {
      return true;
    }

    return false;
  }
}