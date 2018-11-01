"use strict";

const ArticleGrid = props => {
  return (
    <div>
      {props.items.map((item, index) => {
        return <Article key={index} {...item} />
      })}
    </div>
  );
};
