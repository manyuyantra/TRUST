import React from 'react';
import  {withRouter} from 'react-router-dom';
  
class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
        this.elRef = React.createRef();
    }
    static getDerivedStateFromProps(props){
            if(props.history.location.pathname !== "/"){
return {visible:true}
            }else{
                return  {visible:false};
            }
            
    }
    componentDidUpdate(props,state){
        return;
       // console.log(props.history.location.pathname);
       if(this.props.history.location.pathname !== "/" && (this.state.visible === false && state.visible === true)){
             this.setState({visible:true})
       }else if( this.state.visible === true && state.visible === false){
           this.setState({visible:false})
       }
    }
    render(){  
        return  (

            <div ref = {this.elRef} className =  {this.state.visible?"banner":"banner displayNone"} >
              <b className="bannerItem">Welcome</b>
              <b className="bannerItem">LogOut</b>

     </div>
      
        )
    }

}

export default withRouter(Banner);