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
    const pagesForSwitch = Links.getSortedByPosition().reverse();
    return (
      <Router>
        <div className="tabs">
          <Tabs links={this.state.pages} />
          <div className="tabs__content">
            <Switch>
              {pagesForSwitch.map((page, index) => {
                return (
                  <Route
                    key={index}
                    path={page.path}
                    component={page.component}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
