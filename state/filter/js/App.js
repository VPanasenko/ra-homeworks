'use strict'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filter: 'All',
    }
  }

  changeFilter = (f) => {
    this.setState({
      filter: f,
    })
  }

  filterProjects = () => {
    let filteredProjects = this.props.projects.slice();

    switch(this.state.filter)
    {
      case 'All':
        return filteredProjects;
      default:
        return filteredProjects.filter(p=>p.category === this.state.filter)
    }
  }


  render(){
    

    return (
      <div>
        <Toolbar
          filters={this.props.filters}
          selected={this.state.filter}
          onSelectFilter={(filter) => this.changeFilter(filter)} />
        <Portfolio projects={this.filterProjects()} />
      </div>
    )
  }
}