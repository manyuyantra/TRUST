import React from "react";
import { withRouter } from "react-router-dom";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.elRef = React.createRef();
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    sessionStorage.removeItem("trustToken");
    sessionStorage.removeItem("");
    this.props.auth.removeAuthentication();
    this.props.history.push("/");
  }
  static getDerivedStateFromProps(props) {
    if (props.history.location.pathname !== "/") {
      return { visible: true };
    } else {
      return { visible: false };
    }
  }
  render() {
    return (
      <div
        ref={this.elRef}
        className={this.state.visible ? "banner" : "banner displayNone"}
      >
        <b className="bannerItem">
          <p>Hi</p>{" "}
          <p className="user">{sessionStorage.getItem("portalUser")}</p>
        </b>
        <b
          className="bannerItem"
          style={{ cursor: "pointer" }}
          onClick={this.onClick}
        >
          LogOut
        </b>
      </div>
    );
  }
}

export default withRouter(Banner);
