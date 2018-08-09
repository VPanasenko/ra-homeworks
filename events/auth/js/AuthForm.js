"use strict";

function validateEmail(emailLastSymbol) {
  var re = /[a-zA-Z0-9@._-]/;
  return re.test(emailLastSymbol);
}

function validatePassword(passLastSymbol) {
  var re = /[a-zA-Z0-9_]/;
  return re.test(passLastSymbol);
}

function Name(props) {
  const handleName = e => props.onChange(e.currentTarget.value);

  const n = (
    <div className="Input">
      <input required type="text" placeholder="Имя" onChange={handleName} />
      <label />
    </div>
  );
  return n;
}

function Email(props) {
  const handleEmail = e => {
    let v = e.currentTarget.value;
    if (validateEmail(v.substring(v.length - 1))) {
      props.onChange(v);
    } else {
      let oldValue = v.substring(0, v.length - 1);
      e.currentTarget.value = oldValue;
    }
  };

  const e = (
    <div className="Input">
      <input
        type="email"
        placeholder="Электронная почта"
        onChange={handleEmail}
      />
      <label />
    </div>
  );
  return e;
}

function Password(props) {
  const handlePassword = e => {
    let v = e.currentTarget.value;
    if (validatePassword(v.substring(v.length - 1))) {
      props.onChange(v);
    } else {
      let oldValue = v.substring(0, v.length - 1);
      e.currentTarget.value = oldValue;
    }
  };

  const p = (
    <div className="Input">
      <input
        required
        type="password"
        placeholder="Пароль"
        onChange={handlePassword}
      />
      <label />
    </div>
  );
  return p;
}

function AuthForm(props) {
  let user = {
    name: "",
    email: "",
    password: ""
  };

  const handle = event => {
    event.preventDefault();
    if (props.onAuth && typeof props.onAuth === "function") {
      props.onAuth(user);
    }
  };

  const updateName = value => (user.name = value);
  const updateEmail = value => (user.email = value);
  const UpdatePassword = value => (user.password = value);

  const af = (
    <form className="ModalForm" action="/404/auth/" method="POST">
      <Name onChange={updateName} />
      <Email onChange={updateEmail} />
      <Password onChange={UpdatePassword} />
      <button type="submit" onClick={handle}>
        <span>Войти</span>
        <i className="fa fa-fw fa-chevron-right" />
      </button>
    </form>
  );
  return af;
}
