class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      itemsCount : 0,
    }
  }

  updateOpen = false;
  updateItemsCount = false;

  render() {
    console.log('render');
    return (
      <CartView {...this.props} />
    );
  }

  componentWillMount(){
    console.log('componentWillMount');
    this.setState({isOpen:this.props.isOpen, itemsCount: this.props.items.length});
  }

  componentDidMount(){
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    this.updateOpen = nextProps.isOpen !== this.state.isOpen;
    this.updateItemsCount = nextProps.items.length !== this.state.itemsCount;
    if (this.updateOpen || this.updateItemsCount){
      this.setState({isOpen:nextProps.isOpen, itemsCount: nextProps.items.length});
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate');
    if (this.updateOpen){
      return true;
    }
    if (this.updateItemsCount && !this.updateOpen && this.state.isOpen)
    {
      return true;
    }

    return false;
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('componentDidUpdate');
    this.update = false;
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
  }
}
