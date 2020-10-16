import React, { useState, useEffect } from 'react';
import axios from "axios";
import PlayerProfile from "./player-profile";


// export default class Players extends React.Component {
//     constructor() {
//         super();
//         this.state = {};
//     }

//     handleChange({ target }) {
//         /* target is the object containing the information we are sending with the submit button out of the input fields */
//         this.setState({
//             [target.name]: target.value,
//             playerCount: 0,
//             fullRoster: false,
//         });
//     }

//     getPlayer () {

//         const { player } = this.state;

//         axios.get(`https://v3.football.api-sports.io/players?league=135&search=${player}`, {
//             "headers": {
//                 "x-rapidapi-host": "v3.football.api-sports.io",
// 	            "x-rapidapi-key": "4e1921e65c5733449f4bfbfc9eb4616c",
//             }
//         })
//         .then(response => {
//             console.log("all results: ", response.data.response)
//             console.log(response.data.response[0].player); /* logging player data to be stored in database */
//             /* this.addPlayer(response.data.response[0].player); */
//             this.setState(response.data.response[0].player);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     /* addPlayer (player) {
//         axios.get("/checkroster").then((responseCheckRoster));
//         console.log(responseCheckRoster);
//         if (playerCount <= 25) {
//             axios.post("/addplayer", { id, firstname, lastname, photo, age, height, weight, nationality });
//         } else {
//             this.setState({
//                 fullRoster: true,
//             })
//         }

//     } */


//     render () {
//         return (
//             <>
//                 <input
//                     name="player"
//                     onChange={(e) => this.handleChange(e)}
//                 ></input>
//                 <button onClick={() => this.getPlayer()}>Fetch API</button>
//                 {this.state.response.id && }

//                 {this.state.id && (
//                         <PlayerProfile player_id={this.state.id} firstname={this.state.firstname} lastname={this.state.lastname} photo_url={this.state.photo} age={this.state.age} height={this.state.height} weight={this.state.weight} nationality={this.state.nationality} />
//                     )}
//             </>
//         );
//     }
// }

export default function Players () {
    const [userInput, setUserInput] = useState("");
    const [players, setPlayers] = useState([]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const getPlayers = (userInput) => {
        (async () => {
            try {
                const { data } = await axios.get(`https://v3.football.api-sports.io/players?league=135&search=${userInput}&season=2020`, {
                    "headers": {
                        "x-rapidapi-host": "v3.football.api-sports.io",
                        "x-rapidapi-key": "4e1921e65c5733449f4bfbfc9eb4616c",
                    }
                });
    
                console.log ("data: ", data.response)

                setPlayers(data.response);

    
            } catch (error) {
                console.log("error: ", error);
            }
        })();
    };

    return (
        <>
            <input
                name="player"
                onChange={handleChange}
            ></input>
            <button onClick={() => getPlayers(userInput)}>Fetch API</button>
                {players && <div className="search-results-container">
                        {players.map((player, i) => {
                            return (
                                <div key={i} className="single-result-container">
                                    <PlayerProfile player_id={player.player.id} firstname={player.player.firstname} lastname={player.player.lastname} photo_url={player.player.photo} age={player.player.age} height={player.player.height} weight={player.player.weight} nationality={player.player.nationality} />
                                </div>
                                )
                        })}    
                </div>}
        </>
    );
}