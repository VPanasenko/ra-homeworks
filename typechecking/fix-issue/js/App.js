'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'user@gmail.com',
      first_name: 'Алексей',
      last_name: 'Иванов',
      age: 29,
      nickname: 'anonimizer_me',
      is_married: false
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSearch(e) {
    e.preventDefault();

    alert('Поиск работает!');
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    alert('Профиль обновлен');
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Menu handleSearch={this.onSearch} title={this.props.title} version={this.props.version} items={this.props.menu}/>
        <div className="row">
          <Form {...this.state} handleChange={this.onChange} handleSubmit={this.onSubmit}/>
        </div>
      </React.Fragment>
    );
  }
};
