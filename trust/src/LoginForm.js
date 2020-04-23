import React from "react";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.name = "one";
    this.pass = "one";
    this.nameRef = React.createRef();
    this.passRef = React.createRef();
    this.formRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    if (!this.nameRef.current.value || !this.passRef.current.value) {
      e.preventDefault();
      alert("Oh bad, No login with  empty values....");
    } else if (
      this.nameRef.current.value.trim() !== "one" ||
      this.passRef.current.value.trim() !== "one"
    ) {
      e.preventDefault();
      alert("Good guess, but either password or name is wrong. ");
    } else {
      this.props.auth.setAuthentication();
      this.props.history.push("/main");
    }
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.formRef.current && (this.formRef.current.className = "opacity1");
    }, 100);
  }
  componentWillMount() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  render() {
    return (
      <form ref={this.formRef} id="logIn" onSubmit={this.onSubmit}>
        <input placeholder="NAME" ref={this.nameRef} className=" el logInEl" />
        <input
          placeholder="PASSWORD"
          ref={this.passRef}
          className="el logInEl"
          type="password"
        />
        <button className="loginBtn" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
