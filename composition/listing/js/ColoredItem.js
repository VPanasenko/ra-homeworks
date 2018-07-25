'use strict';

const colors = [
  {type:'unisex', color: 'black'},
  {type:'male', color: 'blue'},
  {type:'female', color: 'orange'},
]

const ColoredItem = ({item}) => {
  function getColor(type){
    let filteredColor = colors.filter(x => x.type === type)[0];
    return filteredColor && filteredColor.color;
  }

  return (
    <Item color={getColor(item.type)} item={item} />
  )
}