import React from 'react'


export default class Members extends React.Component {
    constructor(pr) {
        super(pr);
        this.state = {
            "members": [
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" },
                { "Name": "Dummy", "Email": "DDUMMY@MAILME.COM", "CONTACT": "#922311" }


            ]

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
        return <div className="membersTable">{
            this.generateRow({ Name: "NAME", Email: "EMAIL", "CONTACT": "CONTACT" },
                { clas: "membersHeader" })}
            {this.state.members.map((obj) => this.generateRow(obj))}</div>
    }
}