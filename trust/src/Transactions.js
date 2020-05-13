import React from "react";
import Row from "./Row";
import uuid from "./uuid";

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.headerObj = {
      NAME: "NAME",
      "CREDIT AMOUNT": "CREDIT AMOUNT",
      DATETIME: "DATE AND TIME",
    };
    this.keyToCompMap = {
      NAME: "text",
      "CREDIT AMOUNT": "text",
      DATETIME: "text",
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
    this.generateHeader = this.generateHeader.bind(this);
    this.generateBody = this.generateBody.bind(this);
  }
  generateHeader() {
    return (
      <Row
        obj={this.headerObj}
        additionalClas={this.additionalClas}
        componentsOrder={this.componentsOrder}
        noEvent={true}
        key={uuid()}
      ></Row>
    );
  }
  generateBody() {
    return this.state.members.map((obj, i) => {
      return (
        <Row
          obj={obj}
          componentsOrder={this.componentsOrder}
          noEvent={true}
          key={uuid()}
          keyToCompMap={this.keyToCompMap}
        />
      );
    });
  }
  render() {
    return (
      <div ref={this.tableRef} className="membersTable">
        <>{this.generateHeader()}</>
        <>{this.generateBody()}</>
      </div>
    );
  }
}
