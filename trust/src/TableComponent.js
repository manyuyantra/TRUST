import React from "react";
import Row from "./Row";
import uuid from "./uuid";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: this.props.members.map((el) => {
        if (!el.rowdId) el.rowdId = uuid();
        return el;
      }),
      isInEditMode: false,
      noPointerEvents: props.noPointerEvents ? true : false,
    };
    this.keyToCompMap = props.keyToCompMap;
    this.defaultLookMap = props.defaultLookMap;
    this.componentsOrder = props.componentsOrder;
    this.headerObj = props.headerObj;
    this.onCellClick = this.onCellClick.bind(this);
    this.additionalClas = props.additionalClas;
    this.tableRef = React.createRef();
    this.removeEditMode = this.removeEditMode.bind(this);
  }
  static getDerivedStateFromProps(props) {
    return {
      members: props.members.map((el) => {
        if (!el.rowdId) el.rowdId = uuid();
        return el;
      }),
    };
  }
  componentDidMount() {
    this.tableRef.current.addEventListener(
      "click",
      () => {
        if (this.alteredData) {
          this.removeEditMode();
        }
      },
      true
    );
  }
  onCellClick(event, obj, key) {
    event.stopPropagation();
    if (this.alteredData) {
      this.alteredData.isEditingActive = false;
      this.alteredData.editingProperty = "";
      this.alteredDataIndex = null;
    }
    this.alteredDataIndex = this.state.members.findIndex(
      (el) => el.rowdId === obj.rowdId
    );
    this.alteredData = this.state.members[this.alteredDataIndex];
    this.alteredData.editingProperty = key;

    this.newState = this.state.members.map((el, i) => {
      if (i === this.alteredDataIndex) {
        return this.alteredData;
      } else if (el.isEditingActive) {
        el.isEditingActive = false;
        return el;
      } else {
        return el;
      }
    });
    this.setState(() => {
      return {
        members: this.newState,
        isInEditMode: true,
      };
    });
  }
  removeEditMode() {
    if (this.alteredData) {
      this.alteredData.isEditingActive = false;
      this.alteredData.editingProperty = "";
      this.alteredDataIndex = null;
    }

    this.setState(() => {
      return {
        isInEditMode: false,
      };
    });
  }
  render() {
    return (
      <div
        ref={this.tableRef}
        className={
          this.state.noPointerEvents
            ? "membersTable pointerEventsNone"
            : "membersTable"
        }
      >
        <Row
          obj={this.headerObj}
          additionalClas={this.additionalClas}
          componentsOrder={this.componentsOrder}
          noEvent={true}
          key={uuid()}
        />

        {this.state.members.map((obj, i) => {
          return (
            <Row
              keyToCompMap={this.keyToCompMap}
              defaultLookMap={this.defaultLookMap}
              componentsOrder={this.componentsOrder}
              obj={obj}
              onCellClick={sessionStorage.getItem("portalUser") ==="admin"? this.onCellClick:()=>{}}
              additionalClas={this.props.tableBodyClass}
              key={obj.rowdId}
              isInEditMode={
                this.state.isInEditMode && this.alteredData === obj
                  ? true
                  : false
              }
            />
          );
        })}
      </div>
    );
  }
}
