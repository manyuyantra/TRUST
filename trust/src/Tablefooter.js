import React from "react";

function Tablefooter(props) {
  return (
    <div key="modifyMembers" className="modifyMembers">
      <button className="button">ADD USER</button>
      <button className="button" onClick={props.modifyData}>
        MODIFY THE DETAILS
      </button>
      <button className="button" onClick={props.helper}>
        HELP
      </button>
    </div>
  );
}

export default React.memo(Tablefooter);
