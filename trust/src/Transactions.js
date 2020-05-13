import React from "react";
import Row from "./Row";
import uuid from "./uuid";
import TableComponent from "./TableComponent";

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.Input = this.Input.bind(this);
    this.headerObj = {
      NAME: "NAME",
      "CREDIT AMOUNT": "CREDIT AMOUNT",
      DATETIME: "DATE AND TIME",
    };
    this.keyToCompMap = {
      NAME: this.Input,
      "CREDIT AMOUNT": this.Input,
      DATETIME: this.Input,
    };
    let arr = [];
    for (let i = 0; i < 21; i++) {
      arr.push({
        NAME: "name ",
        "CREDIT AMOUNT": "CREDIT",
        DATETIME: new Date().toString(),
      });
    }
    this.state = {
      members: arr,
    };
    this.additionalClas = { clas: "membersHeader" };
    this.componentsOrder = ["NAME", "CREDIT AMOUNT", "DATETIME"];
  }
  Input(props) {
    const [s, uS] = React.useState(props.value);
    React.useEffect(() => {
      props.obj[props.obj.editingProperty] = s;
    }, [s]);
    return (
      <input
        onChange={(e) => {
          uS(e.target.value);
        }}
        autoFocus
        value={s}
      />
    );
  }

  render() {
    return (
      <TableComponent
        componentsOrder={this.componentsOrder}
        defaultLookMap={this.keyToCompMap}
        keyToCompMap={this.keyToCompMap}
        headerObj={this.headerObj}
        additionalClas={this.additionalClas}
        members={this.state.members}
        tableBodyClass = "pointerEventsNone"      
      ></TableComponent>
    );
  }
}
