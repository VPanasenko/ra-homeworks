'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const Profile = props => {
  const birthday = new Date(props.birthday).toLocaleDateString();
  return (
    <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle}/>
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={birthday}>{birthday}</a></p>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  first_name: 'FirstName',
  last_name: 'LastName',
  img: './images/profile.jpg',
  url: 'https://vk.com/user',
  birthday: new Date().toJSON().slice(0,10),
}

Profile.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  img: PropTypes.string,
  url: urlPropTypeChecker.isRequired,
  birthday: datePropTypeChecker.isRequired,
}