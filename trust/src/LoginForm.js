import React from "react";
import url from "./url";
import axios from "axios";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.nameRef = React.createRef();
    this.passRef = React.createRef();
    this.formRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    const t = this;
    e.preventDefault();
    const resp = axios.post(`${url}/trust/authenticate`, {
      username: this.nameRef.current.value,
      password: this.passRef.current.value,
    });
    resp.then(function (response) {
      if (response.status === 200) {
        t.props.auth.setAuthentication(response.data.token,t.nameRef.current.value);
        t.props.history.push("/main");
      }
    });
    resp.catch(() => {
      alert("Unauthorized");
    });
  }
  componentDidMount() {
    if (sessionStorage.getItem("trustToken")) {
      this.props.auth.setAuthentication();
      this.props.history.push("/main");
    }
    //this.getUsers();
    this.timer = setTimeout(() => {
      this.formRef.current && (this.formRef.current.className = "opacity1");
    }, 100);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  render() {
    return (
      <div className="loginDiv">
        <h4>TRUST</h4>
        <form ref={this.formRef} id="logIn" onSubmit={this.onSubmit}>
          <input
            placeholder="Username"
            ref={this.nameRef}
            className=" el logInEl"
          />
          <input
            placeholder="Password"
            ref={this.passRef}
            className="el logInEl"
            type="password"
          />
          <button className="loginBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
