import React from "react";
import Row from "./Row";
import Tablefooter from "./Tablefooter";
import serialize from "form-serialize-json";
import uuid from "./uuid";

export default class Members extends React.Component {
  constructor(pr) {
    super(pr);
    let arr = [];

    for (let i = 0; i < 5; i++) {
      arr.push({
        Name: "Dummy",
        Email: "DDUMMY@MAILME.COM",
        CONTACT: "#922311",
        Address: "#123, street number,city, state",
        OPTOUT: false,
        rowdId: this.create_UUID(),
      });
    }
    this.state = {
      members: arr,
      isAddUserActive: false,
    };
    this.headerObj = {
      OPTOUT: "OPT-OUT",
      Name: "NAME",
      Email: "EMAIL",
      CONTACT: "PHONE",
      Address: "ADDRESS",
    };
    this.keyToCompMap = {
      OPTOUT: this.Optout,
      Name: this.Textarea,
      Email: this.Textarea,
      Address: this.Textarea,
      CONTACT: this.Textarea,
    };
    this.componentsOrder = ["OPTOUT", "Name", "Email", "CONTACT", "Address"];
    this.additionalClas = { clas: "membersHeader" };
    this.tableRef = React.createRef();
    this.alteredDataIndex = 0;
    this.onCellClick = this.onCellClick.bind(this);
    this.removeEditMode = this.removeEditMode.bind(this);
    this.modifyData = this.modifyData.bind(this);
    this.openForm = this.openForm.bind(this);
    this.getNextState = this.getNextState.bind(this);
    this.unMountForm = this.unMountForm.bind(this);
  }
  unMountForm() {
    this.setState({ isAddUserActive: false });
  }
  getNextState() {
    return this.state.members.map((el, i) => {
      if (el.isEditingActive) {
        let o = { ...el };
        o.isEditingActive = false;
        return o;
      } else {
        return el;
      }
    });
  }
  modifyData() {
    this.newState = this.getNextState().filter((el) => !el.OPTOUT);

    this.setState(() => {
      return {
        members: this.newState,
      };
    });
  }

  removeEditMode() {
    console.log("remove edit mode...");
    this.newState = this.getNextState();
    if (this.alteredData) {
      this.alteredData.isEditingActive = false;
      this.alteredData.k = "";
      this.alteredDataIndex = null;
    }

    this.setState(() => {
      return {
        members: this.newState,
      };
    });
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
  addUser(obj) {
    const newObj = { ...obj, OPTOUT: false, rowdId: this.create_UUID() };
    this.setState({ isAddUserActive: false });
    const next = [newObj, ...this.getNextState()];
    this.setState(() => {
      return {
        members: next,
        isAddUserActive: false,
      };
    });
  }
  openForm() {
    this.setState({ isAddUserActive: true });
    return;
  }

  onCellClick(event, obj, key) {
    event.stopPropagation();
    console.log("alerter....", obj);
    if (this.alteredData) {
      this.alteredData.isEditingActive = false;
      this.alteredData.k = "";
      this.alteredDataIndex = null;
    }
    this.alteredDataIndex = this.state.members.findIndex(
      (el) => el.rowdId === obj.rowdId
    );
    this.alteredData = this.state.members[this.alteredDataIndex];
    this.alteredData.isEditingActive = true;
    this.alteredData.k = key;

    this.newState = this.state.members.map((el, i) => {
      if (i === this.alteredDataIndex) {
        return { ...this.alteredData };
      } else if (el.isEditingActive) {
        let o = { ...el };
        o.isEditingActive = false;
        return o;
      } else {
        return el;
      }
    });
    this.setState(() => {
      return {
        members: this.newState,
      };
    });
  }
  helper() {
    alert(`
        1) TO REMOVE USERS 
            select opt-out checkbox and click modify the details.
        2) TO CHANGE ANY DETAILS
            click the respective column. 
            input box will appear. make changes and click outside. then click modify the details`);
  }
  Optout(props) {
    const [s, uS] = React.useState(props.obj.OPTOUT);
    const ref = React.useRef();
    React.useEffect(() => {
      const node = ref.current.parentNode.parentNode;
      props.obj.OPTOUT = s;
      if (s === true) {
        node.classList.add("optout");
      } else {
        node.classList.remove("optout");
      }
    }, [s]);
    return (
      <input
        ref={ref}
        type="checkbox"
        {...props}
        checked={s}
        onChange={(e) => {
          uS(!s);
        }}
      ></input>
    );
  }
  Textarea(props) {
    const [s, uS] = React.useState(props.value);
    React.useEffect(() => {
      props.obj[props.obj.k] = s;
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
  create_UUID() {
    return uuid();
  }
  render() {
    const Textarea = this.Textarea;
    const Optout = this.Optout;

    return (
      <>
        <div
          ref={this.tableRef}
          className={
            this.state.isAddUserActive
              ? "membersTable pointerEventsNone"
              : "membersTable"
          }
        >
          <Row
            obj={this.headerObj}
            additionalClas={this.additionalClas}
            componentsOrder={this.componentsOrder}
            noEvent={true}
          />

          {this.state.members.map((obj, i) => {
            return (
              <Row
                keyToCompMap={this.keyToCompMap}
                componentsOrder={this.componentsOrder}
                obj={obj}
                onCellClick={this.onCellClick}
                additionalClas={false}
                key={obj.rowdId}
              />
            );
          })}
        </div>
        {this.state.isAddUserActive ? (
          <form className="addUser" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label>NAME:</label>
              <input className="el loginEl" name="Name" type="text" />
            </div>
            <div className="row">
              <label>EMAIL:</label>
              <input className="el loginEl" name="Email" type="text" />
            </div>
            <div className="row">
              <label>PHONE:</label>
              <input className=" el loginEl" name="CONTACT" type="text" />
            </div>
            <div className="row">
              <label>ADDRESS:</label>
              <input className="el loginEl" name="Address" type="text" />
            </div>
            <div className="row">
              <button
                onClick={() =>
                  this.addUser(serialize(document.querySelector(".addUser")))
                }
                style={{ marginRight: "15%" }}
              >
                OK
              </button>
              <button onClick={this.unMountForm} style={{ marginRight: "15%" }}>
                CANCEL
              </button>
            </div>
          </form>
        ) : null}
        <Tablefooter
          isAddUserActive={this.state.isAddUserActive}
          addUser={this.openForm}
          modifyData={this.modifyData}
          helper={this.helper}
        ></Tablefooter>
      </>
    );
  }
}
