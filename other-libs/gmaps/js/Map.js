class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: []
    };
  }

  map = null;
  mapRef = null;

  componentWillMount() {
    if (this.props.points) {
      this.setState({
        points: this.props.points
      });
    }
  }

  componentDidMount() {
    console.log(this.mapRef);
    this.map = new google.maps.Map(this.mapRef, {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  }

  componentWillReceiveProps() {}

  render() {
    return <div ref={el => (this.mapRef = el)} />;
  }

  componentWillUnmount() {}
}
