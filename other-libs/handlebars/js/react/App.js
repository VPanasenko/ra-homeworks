"use strict";

const App = props => {
  return (
    <div>
      <Nav title={props.context.title} date={props.context.today} quote={props.context.quote}/>
      <ArticleGrid items={props.articles}/>
    </div>
  );
};
