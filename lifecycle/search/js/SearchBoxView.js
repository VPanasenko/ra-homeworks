const SearchBoxView = ({ fixed, setRef }) => (
  <section className="container" ref={setRef}>
    <div className="row">
      <div className="col-sm-12">
        <input
          className={`search-box ${fixed ? "search-box_fixed" : null}`}
          placeholder="Поиск"
        />
      </div>
    </div>
  </section>
);
