import React from 'react';
import  Card  from  './Card';
export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.items = [
                 {"Name":"Members","Value":"8"},
                 {"Name":"Account", "Value":"1234"},
                 {"Name":"Transcations","Value":"Transcations"},
                 {"Name":"Reciept","Value":"Reciept"}

        ]
    }
    render() {
        return (

            this.items.map((obj,i)=>{
                return  <Card {...obj} __i={i} key={i}></Card>

        })
        )  

           
        
    }
}