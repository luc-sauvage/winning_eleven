import React, { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setLastAddedPlayer, setFullRoster } from "./actions";

export default function PlayerProfile() {
    const dispatch = useDispatch();

    const players = useSelector((state) => state.playersData);
    const lastAddedPlayer = useSelector((state) => state.lastPlayer);
    const fullRoster = useSelector((state) => state.fullRoster);

    // const [addedPlayer, setAddedPlayer] = useState();
    // const [fullRoster, setFullRoster] = useState();

    function addPlayer(selectedPlayerInfo) {
        axios
            .get("/checkroster")
            .then((responseCheckRoster) => {
                console.log(responseCheckRoster.data);
                let rosterCount = responseCheckRoster.data;

                if (rosterCount <= 25) {
                    /* let playerInfo = props; */
                    console.log("selectedPlayerInfo: ", selectedPlayerInfo);
                    let {
                        id,
                        firstname,
                        lastname,
                        photo,
                        age,
                        height,
                        weight,
                        nationality,
                    } = selectedPlayerInfo;
                    axios
                        .post("/addplayer", {
                            player_id: id,
                            firstname,
                            lastname,
                            photo_url: photo,
                            age,
                            height,
                            weight,
                            nationality,
                        })
                        .then((response) => {
                            console.log("response data:", response.data[0]);
                            if (response.data) {
                                dispatch(setLastAddedPlayer(response.data[0]));
                                dispatch(setPlayersProfiles([]));
                            }
                        });
                } else {
                    dispatch(setFullRoster(true));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="search-results-container">
                {players.length > 0 &&
                    players.map((player, i) => {
                        return (
                            <div key={i} className="single-result-container">
                                <img src={player.player.photo}></img>
                                <p>First name: {player.player.firstname}</p>
                                <p>Last name: {player.player.lastname}</p>
                                <p>Age: {player.player.age}</p>
                                <p>Height: {player.player.height}</p>
                                <p>Weight: {player.player.weight}</p>
                                <p>Nationality: {player.player.nationality}</p>
                                <button
                                    onClick={() => addPlayer(player.player)}
                                >
                                    Insert in roster
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
