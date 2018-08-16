"use strict";

const ArticleGrid = props => {
  return (
    <main className="container">
      {props.items.map((item, index) => {
        return <Article key={index} {...item} />
      })}
    </main>
  );
};
