import React from "react";

export default class Members extends React.Component {
  constructor(pr) {
    super(pr);
    let arr = [];

    for (let i = 0; i < 50; i++) {
      arr.push({
        Name: "Dummy",
        Email: "DDUMMY@MAILME.COM",
        CONTACT: "#922311",
        Address: "#123, street number,city, state",
        OPTOUT: false,
      });
    }
    this.state = {
      members: arr,
    };
    this.generateRow = this.generateRow.bind(this);
  }

  generateRow(obj, additionalClas, key) {
    return (
      <div
        key={key}
        className={
          additionalClas ? additionalClas.clas + " membersRow" : "membersRow"
        }
      >
        {additionalClas && additionalClas.clas == "membersHeader" ? (
          <div>{obj.OPTOUT}</div>
        ) : (
          <div>
            <input type="checkbox" checked={obj.OPTOUT}></input>
          </div>
        )}
        <div>{obj.Name}</div>
        <div>{obj.Email}</div>
        <div>{obj.CONTACT}</div>
        <div>{obj.Address}</div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.generateRow(
          {
            OPTOUT: "OPT-OUT",
            Name: "NAME",
            Email: "EMAIL",
            CONTACT: "PHONE",
            Address: "ADDRESS",
          },
          { clas: "membersHeader" }
        )}
        <div className="membersTable">
          {this.state.members.map((obj, i) => this.generateRow(obj, false, i))}
        </div>
        <div className="modifyMembers">
          <button className="button">ADD USER</button>
          <button className="button">MODIFY THE DETAILS</button>
        </div>
      </>
    );
  }
}
