"use strict";

const activeClassName = "tabs__item-active";

const Tabs = props => {
  return (
    <nav className="tabs__items">
        {props.links.map((link, index) => {
          return (<NavLink
            key={index}
            className="tabs__item"
            activeClassName={activeClassName}
            to={link.path}
          />);
        })}
    </nav>
  );
};
