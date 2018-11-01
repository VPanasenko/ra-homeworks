class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      points: [],
      zoom: 1,
      numberToShowMap: 0
    };
  }

  map = null;
  mapRef = null;
  markers = [];

  componentWillMount() {
    this.setData(this.props);
  }

  componentDidMount() {
    this.initMap();
    this.addMarkers(this.state.points);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps);
  }

  componentDidUpdate() {
    if (!this.map) {
      this.initMap();
    }
    this.removeMarkers();
    this.addMarkers(this.state.points);
  }

  render() {
    return (
      <div>
        <div className="map" ref={el => (this.mapRef = el)} />
      </div>
    );
  }

  componentWillUnmount() {
    this.removeMarkers();
  }

  initMap() {
    if (this.mapRef) {
      this.map = new google.maps.Map(this.mapRef, {
        center: this.state.center.center,
        zoom: this.state.zoom
      });
    }
  }

  addMarkers(points) {
    if (points && points.length > 0) {
      points.map((point, index) => {
        this.markers.push(
          new google.maps.Marker({
            position: point.center,
            title: point.title,
            map: this.map
          })
        );
      });
    }
  }

  setMapOnMarkers(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  removeMarkers() {
    this.setMapOnMarkers(null);
    this.markers = [];
    if (this.state.points.length <= this.state.numberToShowMap) {
      this.map = null;
    }
  }

  setData(props) {
    if (props.points && props.points.length > 0) {
      const updatedPoints = this.updatePoints(props.points);
      this.setState({
        center: updatedPoints[0],
        points: updatedPoints
      });
    } else if (props.center) {
      this.setState({ center: this.updatePoints(props.center) });
    }
    if (props.zoom) {
      this.setState({ zoom: parseInt(props.zoom) });
    }
    if (props.numberToShowMap) {
      this.setState({ numberToShowMap: parseInt(props.numberToShowMap) });
    }
  }

  updatePoints(arr) {
    if (!arr) return arr;
    if (Array.isArray(arr)) {
      let newArr = [];
      arr.forEach(element => {
        newArr.push({
          center: { lat: element.lat, lng: element.lon },
          title: JSON.stringify(element)
        });
      });
      return newArr;
    } else {
      const newPoint = {
        center: { lat: arr.center.lat, lng: arr.center.lon },
        title: JSON.stringify(arr)
      };
      return newPoint;
    }
  }
}

Map.propTypes = {
  zoom: PropTypes.number,
  numberToShowMap: PropTypes.number,
  center: PropTypes.shape({
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    title: PropTypes.string
  }).isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      center: PropTypes.arrayOf(
        PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number
        })
      ).isRequired,
      title: PropTypes.string
    })
  )
};

Map.defaultProps = {
  zoom: 1,
  numberToShowMap: 0,
  center: { center: { lat: 55.758006, lon: 37.618958 }, title: "Moscow" }
};
