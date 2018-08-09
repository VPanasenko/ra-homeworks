"use strict";

const decorateWithNewOrPopular = Component => {
  return function(...args) {
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
};

const VideoDecorated = decorateWithNewOrPopular(Video);
const ArticleDecorated = decorateWithNewOrPopular(Article);
