import React from 'react';
import  Card  from  './Card';
export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.items = [
                 {"Name":"Members","Value":"8","Route":"/members"},
                 {"Name":"Account", "Value":"1234","Route":"/account"},
                 {"Name":"Transcations","Value":"Transcations","Route":"/transactions"},
                 {"Name":"Reciept","Value":"Reciept","Route":"/reciept"}

        ]
    }
    render() {
        return (

            this.items.map((obj,i)=>{
                return  <Card {...obj} {...this.props} __i={i} key={i}></Card>

        })
        )  

           
        
    }
}