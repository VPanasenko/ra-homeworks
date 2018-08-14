const Article = (props) => {
  const article = getItemById(props.items, props.match.params.id);
  return (
    article && 
    <div>
      <article className="container m-5">
        <h1>{article.value.title}</h1>
        {article.value.additionalDescription && <p>{article.value.additionalDescription}</p>}
        {article.value.additionalTitle && <h2>{article.value.additionalTitle}</h2>}
        {getItemsWithIds(article.value.body.split("\n")).map(text => <p key={text.guid}>{text.value}</p>)}
      </article>
    </div>
  );
};