import React from "react";

export default class Fader extends React.Component {
  constructor(props) {
    super(props);
    this.elRef = React.createRef();
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.elRef.current && (this.elRef.current.className = "opacity1");
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
      
    return ( 
      <div
        ref={this.elRef}
        stlye="transition:all .15s linear"
        className="opacity0"
      >
        {this.props.component}
      </div>
    );
  }
}
