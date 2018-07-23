'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      icon: VIEW_LIST,
      displayAsList: true,
    }
  }

  switchView = () => {
    if (this.state.icon === VIEW_LIST){
      this.setState({icon: VIEW_MODULE, displayAsList: false});
    } 
    else{
      this.setState({icon: VIEW_LIST, displayAsList: true});
    }
  }


  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={this.state.icon}
            onSwitch={this.switchView} />
        </div>
        {this.renderLayout(this.state.displayAsList)}
      </div>
    );
  }

  //Можно и ниже переписать с cardView на this.state.displayAsList, 
  //чтобы, например, уменьшить число передаваемых атрибутов у методов renderLayout и getShopItems. 
  renderLayout(cardView) {
    if (cardView) {
      return (
        <CardsView
          layout={this.props.layout}
          cards={this.getShopItems(this.props.products, cardView)} />
      );
    }
    return (<ListView items={this.getShopItems(this.props.products, cardView)} />);
  }

  getShopItems(products, cardView) {
    return products.map(product => {
      let cardProps = {
        title: product.name,
        caption: product.color,
        img: product.img,
        price: `$${product.price}`
      };
      if (cardView) {
        return (
          <ShopCard {...cardProps}/>
        );
      }
      return (<ShopItem {...cardProps}/>)
    });
  }
}
