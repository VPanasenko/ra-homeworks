"use strict";

const Article = props => {
  return (
    <article className="article">
      <h2>{props.subject}</h2>
      <p>{props.body}</p>
    </article>
  );
};
