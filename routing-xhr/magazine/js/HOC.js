"use strict";

const withNav = WrappedComponent => {
  function WithNav(...args) {
    const f = (
      <div>
        <Nav />
        {WrappedComponent(...args)}
      </div>
    );
    return f;
  }

  WithNav.displayName = `withNav${getHOCComponentName(WrappedComponent)}`;

  return WithNav;
};

const HomePageWithNav = withNav(Homepage);
const ArticleWithNav = withNav(Article);
