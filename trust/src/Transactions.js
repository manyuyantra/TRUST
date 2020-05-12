import React from "react";
import Row from "./Row";
import uuid from "./uuid";

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.headerObj = {
      NAME: "NAME",
      "CREDIT AMOUNT": "CREDIT AMOUNT",
      DATE: "DATE",
    };
    this.additionalClas = { clas: "membersHeader" };
    this.componentsOrder = ["NAME", "CREDIT AMOUNT", "DATE"];
    this.generateHeader = this.generateHeader.bind(this);
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
  render() {
    return (
      <div ref={this.tableRef} className="membersTable">
        {this.generateHeader()}
      </div>
    );
  }
}
