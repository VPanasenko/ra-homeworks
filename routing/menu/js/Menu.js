"use strict";

const activeClassName = "menu__item-active";

const Menu = props => {
  return (
    <nav className="menu">
      {props.links.map((link, index) => {
          return (
            <NavLink
              key={index}
              className="menu__item"
              activeClassName={activeClassName}
              exact={link.exact}
              to={link.path}
            >
              {link.title}
            </NavLink>
          );
        })}
    </nav>
  );
};
