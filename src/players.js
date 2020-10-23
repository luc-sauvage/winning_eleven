import React, { useState, useEffect } from "react";
import axios from "./axios";
import PlayerProfile from "./player-profile";
import CurrentRoster from "./current-roster";
import { useDispatch, useSelector } from "react-redux";
import {
    setPlayersProfiles,
    setSearchResults,
    setLastAddedPlayer,
} from "./actions";
const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");
import { Link } from "react-router-dom";

export default function Players() {
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState("");
    const players = useSelector((state) => state.playersData);
    const searchResults = useSelector((state) => state.searchResults);
    const lastAddedPlayer = useSelector((state) => state.lastPlayer);
    const fullRoster = useSelector((state) => state.rosterStatus);
    const currentRoster = useSelector((state) => state.currentRoster);
    // const [players, setPlayers] = useState([]);

    useEffect(() => {
        dispatch(setLastAddedPlayer(false));
    }, []);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const getPlayers = (userInput) => {
        (async () => {
            dispatch(setLastAddedPlayer(false));
            dispatch(setSearchResults(true));
            try {
                const { data } = await axios.get(
                    `https://v3.football.api-sports.io/players?league=135&search=${userInput}&season=2020`,
                    {
                        headers: {
                            "x-rapidapi-host": xRapidapiHost,
                            "x-rapidapi-key": xRapidapiKey,
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
        <div className="search-page">
            <div className="navbar">
                <Link to="/overview">
                    <img
                        className="navbar-logo"
                        src="/images/logowinning11_navbar.png"
                    ></img>
                </Link>
                <input
                    className="search-field"
                    name="player"
                    onChange={handleChange}
                    placeholder="Insert player name..."
                ></input>
                <button
                    className="button"
                    onClick={() => getPlayers(userInput)}
                >
                    Search player
                </button>
            </div>
            <div className="search-results-area">
                {searchResults && <PlayerProfile />}
                {lastAddedPlayer && (
                    <div className="information-container">
                        <img src="/images/green-flag.png"></img>{" "}
                        {lastAddedPlayer.firstname} {lastAddedPlayer.lastname}{" "}
                        was successfully added to the roster!{" "}
                    </div>
                )}
                {fullRoster && (
                    <div className="information-container">
                        <img src="/images/red-cross.png"></img>
                        <p>
                            You cannot add another players, you have reached the
                            maximum amount!
                        </p>
                        <Link to="/overview">
                            <button
                                type="button"
                                className="full-roster-button"
                            >
                                Go to overview!
                            </button>
                        </Link>
                    </div>
                )}
                {!fullRoster && currentRoster && currentRoster.length === 25 && (
                    <div className="information-container">
                        <img src="/images/green-flag.png"></img>{" "}
                        <p>Your roster now is complete!</p>
                        <Link to="/overview">
                            <button
                                type="button"
                                className="full-roster-button"
                            >
                                Go to overview!
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <CurrentRoster />
        </div>
    );
}
