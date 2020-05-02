import React from "react";
import url from "./url";

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
    const nameData = this.users.find(
      (el) => this.nameRef.current.value === el.username
    );
    const passData = nameData
      ? this.passRef.current.value === nameData.password
      : false;

    if (!this.nameRef.current.value || !this.passRef.current.value) {
      e.preventDefault();
      alert("Oh bad, No login with  empty values....");
    } else if (
      (nameData && !passData) ||
      (!nameData && passData) ||
      (!nameData && !passData)
    ) {
      console.log(this.users);
      alert("Good guess, but either username or  password  is wrong. ");
      e.preventDefault();
    } else {
      sessionStorage.setItem("portaluser", nameData.username);
      this.props.auth.setAuthentication();
      this.props.history.push("/main");
    }
  }
  componentDidMount() {
    this.getUsers();
    this.timer = setTimeout(() => {
      this.formRef.current && (this.formRef.current.className = "opacity1");
    }, 100);
  }
  async getUsers() {
    await fetch(`${url}` + "/trust/demo/users").then((res) => {
      res.json().then((data) => {
        this.users = data;
      });
    });
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
          <input placeholder="Username" ref={this.nameRef} className=" el logInEl" />
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
