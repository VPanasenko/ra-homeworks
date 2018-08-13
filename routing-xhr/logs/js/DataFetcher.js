const withFetcher = ({ url, collName }) => WrappedComponent => 
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        [collName]: []
      };
    }

    componentDidMount() {
      if (typeof url === "function") {
        url = url(this.props);
      }

      const params = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };

      fetch(url, params)
        .then(response => response.json())
        .then(data => {
          this.setState({ [collName]: data });
        });
    }

    render() {
      console.log("withFetcher");
      console.log(this.state);
      const logs = this.state[collName];
      return <WrappedComponent {...this.props} logs={logs} />;
    }
  };

const AppFetcher = withFetcher({
  url: "https://baconipsum.com/api/?type=meat-and-filler&paras=50",
  collName: "logs"
})(App);
