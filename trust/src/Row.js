import React from "react";
import uuid from "./uuid";
class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.generateHeader = this.generateHeader.bind(this);
    this.generateNormal = this.generateNormal.bind(this);
  }
  generateHeader() {
    return (
      <div
        key={this.props.rowdId}
        className={
          this.props.additionalClas
            ? this.props.additionalClas.clas + " membersRow"
            : "membersRow"
        }
      >
        {this.props.componentsOrder.map((el, i) => {
          return (
            <div className="cell" key={uuid()}>
              {this.props.obj[el]}
            </div>
          );
        })}
      </div>
    );
  }
  generateNormal() {
    return (
      <div key={this.props.rowdId} className="membersRow">
        {this.props.componentsOrder.map((el, i) => {
          const Comp = this.props.keyToCompMap[el];

          return (
            <div
              className="cell"
              key={uuid()}
              onClick={(event) => {
                this.props.onCellClick(event, this.props.obj, el);
              }}
            >
              {this.props.obj.isEditingActive && this.props.obj.k === el ? (
                <Comp
                  obj={this.props.obj}
                  onBlur={this.props.onBlur}
                  value={this.props.obj[el]}
                ></Comp>
              ) : (
                this.props.obj[el]
              )}
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    const Textarea = this.props.Textarea;
    const obj = this.props.obj;
    const onCellClick = this.props.onCellClick;
    const Optout = this.props.optout;
    const noEvent = this.props.noEvent;
    const keyToCompMap = this.props.keyToCompMap;

    const isHeader =
      this.props.additionalClas &&
      this.props.additionalClas.clas == "membersHeader";
    var Result = null;
    if (isHeader) {
      Result = this.generateHeader();
    } else {
      Result = this.generateNormal();
    }
    return <>{Result}</>;
  }
}

Row.defaultProps = {
  onCellClick: null,
};
export default Row;
