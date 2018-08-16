"use strict";

const Nav = props => {
  return (
    <div>
      <header className="info">
        <h1>
          {props.title} | <small> {props.date}</small>
        </h1>
        <section>
          <p>Мудрость на сегодня: {props.quote}</p>
        </section>
      </header>
    </div>
  );
};
