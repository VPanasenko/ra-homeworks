"use strict";

const decorateWithNewOrPopular = Component => {
  function DecorateWithNewOrPopular(...args) {
    const views = args[0].views;
    const f = Component(...args);

    if (views > 1000) {
      return <Popular>{f}</Popular>;
    } else {
      if (views < 100) {
        return <New>{f}</New>;
      } else {
        return f;
      }
    }
  };

  const componentName = Component.displayName || Component.name || "Component";
  DecorateWithNewOrPopular.displayName = `decorateWithNewOrPopular(${componentName})`;

  return DecorateWithNewOrPopular;
};

const VideoDecorated = decorateWithNewOrPopular(Video);
const ArticleDecorated = decorateWithNewOrPopular(Article);
