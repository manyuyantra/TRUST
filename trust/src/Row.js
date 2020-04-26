import React from "react";

export default class Row extends React.PureComponent {
  render() {
    const Textarea = this.props.Textarea;
    const obj = this.props.obj;
    const alerter = this.props.alerter;
    const Optout = this.props.optout;
    return (
      <div
        key={this.props.rowdId}
        changeindex={this.props.obj.__index}
        className={
          this.props.additionalClas
            ? this.props.additionalClas.clas + " membersRow"
            : "membersRow"
        }
      >
        {this.props.additionalClas &&
        this.props.additionalClas.clas == "membersHeader" ? (
          <div className="cell">{this.props.obj.OPTOUT}</div>
        ) : (
          <div className="cell">
            <Optout obj={obj}></Optout>
          </div>
        )}
        <div className="cell" onClick={(event) => alerter(event, obj, "Name")}>
          {obj.isEditingActive && obj.k === "Name" ? (
            <Textarea obj={obj} value={obj[obj.k]} />
          ) : (
            this.props.obj.Name
          )}
        </div>
        <div className="cell" onClick={(event) => alerter(event, obj, "Email")}>
          {obj.isEditingActive && obj.k === "Email" ? (
            <Textarea obj={obj} value={obj[obj.k]} />
          ) : (
            this.props.obj.Email
          )}
        </div>
        <div
          className="cell"
          onClick={(event) => alerter(event, obj, "CONTACT")}
        >
          {obj.isEditingActive && obj.k === "CONTACT" ? (
            <Textarea obj={obj} value={obj[obj.k]} />
          ) : (
            this.props.obj.CONTACT
          )}
        </div>
        <div
          className="cell"
          onClick={(event) => alerter(event, obj, "Address")}
        >
          {obj.isEditingActive && obj.k === "Address" ? (
            <Textarea obj={obj} value={obj[obj.k]} />
          ) : (
            this.props.obj.Address
          )}
        </div>
      </div>
    );
  }
}
