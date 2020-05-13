import React, { useMemo } from "react";
import uuid from "./uuid";

function Cell(props) {
  const el = props.el;
  const Comp = props.keyToCompMap[el];
  const cb = React.useCallback((event) => {
    props.onCellClick(event, props.obj, el);
  });
  return (
    <div className="cell" onClick={cb}>
      {(props.isInEditMode && props.obj.editingProperty === el) ||
      props.cellLookMap !== null && props.cellLookMap[el] === "comp" ? (
        <Comp
          obj={props.obj}
          onBlur={props.onBlur}
          value={props.obj[el]}
        ></Comp>
      ) : (
        props.obj[el]
      )}
    </div>
  );
}
Cell = React.memo(Cell);
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
    const children = [];
    {
      this.props.componentsOrder.forEach((el, i) => {
        if (this.props.obj.editingProperty === el) {
          children.push(<Cell {...this.props} el={el}></Cell>);
        } else {
          const obj = { ...this.props, isInEditMode: false };
          children.push(<Cell {...obj} el={el}></Cell>);
        }
      });
    }
    return (
      <div key={this.props.rowdId} className="membersRow">
        {children}
      </div>
    );
  }
  render() {
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
  onCellClick: ()=>{},
  cellLookMap:null
};
export default Row;
