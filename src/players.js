import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerProfile from "./player-profile";
import { useDispatch, useSelector } from "react-redux";
import { setPlayersProfiles, setSearchResults } from "./actions";

export default function Players() {
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState("");
    const players = useSelector((state) => state.playersData);
    const lastAddedPlayer = useSelector((state) => state.lastPlayer);
    const fullRoster = useSelector((state) => state.fullRoster);
    // const [players, setPlayers] = useState([]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const getPlayers = (userInput) => {
        (async () => {
            dispatch(setSearchResults(true));
            try {
                const { data } = await axios.get(
                    `https://v3.football.api-sports.io/players?league=135&search=${userInput}&season=2020`,
                    {
                        headers: {
                            "x-rapidapi-host": "v3.football.api-sports.io",
                            "x-rapidapi-key":
                                "4e1921e65c5733449f4bfbfc9eb4616c",
                        },
                    }
                );

                console.log("data: ", data.response);

                // setPlayers(data.response);
                dispatch(setPlayersProfiles(data.response));
            } catch (error) {
                console.log("error: ", error);
            }
        })();
    };

    return (
        <>
            <input name="player" onChange={handleChange}></input>
            <button onClick={() => getPlayers(userInput)}>Fetch API</button>
            {players && <PlayerProfile />}
            {lastAddedPlayer && (
                <div>
                    {" "}
                    {lastAddedPlayer.firstname} {lastAddedPlayer.lastname} was
                    successfully added to the roster!{" "}
                </div>
            )}
            {fullRoster && (
                <div>You've reached the maximum amount of players!</div>
            )}
        </>
    );
}
