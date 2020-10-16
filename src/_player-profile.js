import React from 'react';
import axios from "axios";

export default class PlayerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }    

    addPlayer () {
        axios.get("/checkroster").then((responseCheckRoster) => {
            console.log(responseCheckRoster.data);
            let rosterCount = responseCheckRoster.data;
            this.setState({
                rosterCount: rosterCount,
            })

            if (this.state.rosterCount <= 25) {
                let playerInfo = this.props;
                console.log("player info: ", playerInfo);
                axios.post("/addplayer", playerInfo).then((response) => {
                    if (response.data) {
                        this.setState({
                            added: true,
                        });
                    }
                })
            } else {
                this.setState({
                    fullRoster: true,
                })
            }
        }).catch(err => {
            console.log(err);
        });
        
        

    }

    render () {
    return (
            <> {!this.state.added && 
                <div>
                    <img
                    src={this.props.photo_url}
                    ></img>
                    <p>First name: {this.props.firstname}</p>
                    <p>Last name: {this.props.lastname}</p>
                    <p>Age: {this.props.age}</p>
                    <p>Height: {this.props.height}</p>
                    <p>Weight: {this.props.weight}</p>
                    <p>Nationality: {this.props.nationality}</p>
                    <button onClick={() => this.addPlayer()}>Insert in roster</button>
                </div>}
                {this.state.added && 
                <div> {this.props.firstname} {this.props.lastname} was successfully added to the roster! </div>}
                {this.state.fullRoster && 
                <div>You've reached the maximum amount of players!</div>}
            </>
        ); 
    }
    }