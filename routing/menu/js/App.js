"use strict";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  setStateInitialValues = () => {
    this.setState({ pages: Links.getLinks() });
  };

  componentDidMount() {
    const { pages } = this.state;
    if (pages && pages.length === 0) {
      this.setStateInitialValues();
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Menu links={this.state.pages} />
          <div className="page">
            {this.state.pages.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </div>
        </div>
      </Router>
    );
  }
}
