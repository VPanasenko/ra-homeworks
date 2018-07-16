'use strict';

function Stars({count}) {
  let repeated = null;
  if (count && Number.isInteger(count) && count >= 1 && count <= 5)
  {
    let arr = Array(count).fill(null);
    repeated = arr.map((v, i)=>{
      return (
      <li key={i}>
        <Star/>
      </li>
    )});
  }
  return (
    <ul className="card-body-stars u-clearfix">
      {repeated}
    </ul>
  );
}

// Если подключать https://www.npmjs.com/package/prop-types
// Stars.propTypes = {
//   count: PropTypes.number,
// }

Stars.defaultProps = {
  count: 0,
}