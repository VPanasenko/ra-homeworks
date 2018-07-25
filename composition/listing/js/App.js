'use strict';

const App = ({items}) => {
  return (<main>
    {items.map(item => {
      return <ColoredItem item={item} />;
    })}
  </main>)
}
