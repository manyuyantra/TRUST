import React from 'react'


export default class Members extends React.Component {
    constructor(pr) {
        super(pr);
        let arr = [];

        for(let  i =0;i<50;i++){
            arr.push({ "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" })
        }
        this.state = {
            "members": arr

        }
        this.generateRow = this.generateRow.bind(this);
    }

    generateRow(obj, additionalClas) {
        return (<div className={additionalClas ? additionalClas.clas + " membersRow" : "membersRow"}>
            <div >
                {obj.Name}
            </div>
            <div>
                {obj.Email}
            </div>
            <div>
                {obj.CONTACT}
            </div>
        </div>
        )
    }

    render() {

        return( <> 
        {
            this.generateRow({ Name: "NAME", Email: "EMAIL", "CONTACT": "CONTACT" },
                { clas: "membersHeader" })}
        <div className="membersTable">
            {this.state.members.map((obj) => this.generateRow(obj))}</div></>)
    }
}