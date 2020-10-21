import React, { useState, useEffect } from "react";

import axios from "./axios";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoster } from "./actions";

export default function CurrentRoster() {
    const dispatch = useDispatch();
    const currentRoster = useSelector((state) => state.currentRoster);

    useEffect(() => {
        axios
            .get("/current-roster")
            .then((returnedRoster) => {
                console.log("returned roster: ", returnedRoster.data);
                dispatch(setCurrentRoster(returnedRoster.data));
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    return (
        <div className="current-roster-container">
            {currentRoster &&
                currentRoster.map((rosterPlayer, i) => {
                    return (
                        <div key={i} className="roster-player-container">
                            <img
                                className="current-roster-img"
                                src={rosterPlayer.photo_url}
                            ></img>
                            <div className="roster-player-text-container">
                                <p>
                                    {rosterPlayer.firstname}{" "}
                                    {rosterPlayer.lastname}
                                </p>
                                <p>{rosterPlayer.position}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
