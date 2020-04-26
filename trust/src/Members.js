import React from "react";
import Row from "./Row";
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
    };
    this.headerObj = {
      OPTOUT: "OPT-OUT",
      Name: "NAME",
      Email: "EMAIL",
      CONTACT: "PHONE",
      Address: "ADDRESS",
    };
    this.additionalClas = { clas: "membersHeader" };
    this.tableRef = React.createRef();
    this.alteredDataIndex = 0;
    this.alerter = this.alerter.bind(this);
    this.removeEditMode = this.removeEditMode.bind(this);
    this.modifyData = this.modifyData.bind(this);
  }
  modifyData() {
    this.newState = this.state.members
      .map((el, i) => {
        if (el.isEditingActive) {
          let o = { ...el };
          o.isEditingActive = false;
          return o;
        } else {
          return el;
        }
      })
      .filter((el) => !el.OPTOUT);

    this.setState(() => {
      return {
        members: this.newState,
      };
    });
  }

  removeEditMode() {
    this.newState = this.state.members.map((el, i) => {
      if (el.isEditingActive) {
        let o = { ...el };
        o.isEditingActive = false;
        return o;
      } else {
        return el;
      }
    });

    console.log(this.newState);
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
  alerter(event, obj, key) {
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
  helper(){
    alert(`
        1) TO REMOVE USERS 
            select opt-out checkbox and click modify the details.
        2) TO CHANGE ANY DETAILS
            click the respective column. 
            input box will appear. make changes and click outside. then click modify the details`)
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
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }
  render() {
    const Textarea = this.Textarea;
    const Optout = this.Optout;

    return (
      <>
        <div ref={this.tableRef} className="membersTable">
          <Row obj={this.headerObj} additionalClas={this.additionalClas} />

          {this.state.members.map((obj, i) => {
            return (
              <Row
                onBlur={this.removeEditMode}
                obj={obj}
                alerter={this.alerter}
                Textarea={Textarea}
                optout={Optout}
                additionalClas={false}
                key={obj.rowdId}
                rowdId={obj.rowdId}
              />
            );
          })}
        </div>
        <div className="modifyMembers">
          <button className="button">ADD USER</button>
          <button className="button" onClick={this.modifyData}>
            MODIFY THE DETAILS
          </button>
          <button className="button" onClick={this.helper}>
           HELP
          </button>
        </div>
      </>
    );
  }
}
