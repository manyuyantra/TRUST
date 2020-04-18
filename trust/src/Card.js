import React from  'react';



export default class Card extends  React.Component{
   constructor(props){
       super(props);
       this.elRef = React.createRef();
       this.navigate =  this.navigate.bind(this);
   }
    componentDidMount(){
        setTimeout(() => {
            let el = this.elRef.current;
            el.className = "card opacity1";
        }, (this.props.__i+1) *150);
       
    }
    navigate(){
        this.props.history.push(this.props.Route)
    }
    render(){
        return (
              <div ref = {this.elRef}  onClick= {this.navigate} className = "card">
                  <b className = "cardTitle" >{this.props.Name}</b>
                <p className = "cardValue" >{this.props.Value}</p>
              </div>
        )
    }
}