import axios from "./axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupState, setWinningTeam } from "./actions";

export default function PlayerStats() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.popupStats);
    const arrayWithDeletedPlayer = useSelector((state) => state.playerRanking);

    function closePopup() {
        dispatch(setPopupState(false));
    }

    /* function findDeletedPlayer(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                array.splice(array.indexOf(i));
            }
        }
        return null;
    } */

    function deletePlayer(playerId) {
        axios
            .post("/delete", playerId)
            .then((deleteConfirmation) => {
                /* console.log("deleteConfirmation: ", deleteConfirmation); */
                if (deleteConfirmation) {
                    console.log("PLAYER ID", playerId);
                    const arrayWithoutDeletedPlayer = arrayWithDeletedPlayer.filter(
                        (player) => player.id !== playerId.id
                    );
                    console.log(
                        "arrayWithoutDeletedPlayer: ",
                        arrayWithoutDeletedPlayer
                    );
                    dispatch(setWinningTeam(arrayWithoutDeletedPlayer));
                    dispatch(setPopupState(false));
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {player && (
                <div className="popup">
                    <div className="popup-info-container">
                        <div className="popup-left-column">
                            <img
                                className="popup-pic"
                                src={player.photo_url}
                            ></img>
                            <div className="popup-player-info">
                                <p>
                                    <span style={{ color: "black" }}>
                                        Name:{" "}
                                    </span>
                                    {player.firstname} {player.lastname}
                                </p>
                                <p>
                                    <span style={{ color: "black" }}>
                                        Age:{" "}
                                    </span>
                                    {player.age}
                                </p>
                                <p>
                                    <span style={{ color: "black" }}>
                                        Height:{" "}
                                    </span>
                                    {player.height}
                                </p>
                                <p>
                                    <span style={{ color: "black" }}>
                                        Weight:{" "}
                                    </span>
                                    {player.weight}
                                </p>
                                <p>
                                    <span style={{ color: "black" }}>
                                        Nationality:{" "}
                                    </span>
                                    {player.nationality}
                                </p>
                                <p>
                                    <span style={{ color: "black" }}>
                                        Position:{" "}
                                    </span>
                                    {player.position}
                                </p>
                                {player.injured && (
                                    <p style={{ color: "red" }}>
                                        Player is injured
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="popup-right-column">
                            {player.position === "Goalkeeper" ? (
                                <div>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Appearences:{" "}
                                        </span>
                                        {player.appearences || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Minutes played:{" "}
                                        </span>
                                        {player.minutes || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Conceded goals:{" "}
                                        </span>
                                        {player.conceded_goals || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Committed penalties:{" "}
                                        </span>
                                        {player.commited_penalties || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Saved penalties:{" "}
                                        </span>
                                        {player.saved_penalties || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Committed fouls:{" "}
                                        </span>
                                        {player.committed_fouls || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Saves:{" "}
                                        </span>
                                        {player.saves || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Yellow cards:{" "}
                                        </span>
                                        {player.yellow_cards || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Red cards:{" "}
                                        </span>
                                        {player.red_cards || 0}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Appearences:{" "}
                                        </span>
                                        {player.appearences || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Minutes played:{" "}
                                        </span>
                                        {player.minutes || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Goals:{" "}
                                        </span>
                                        {player.total_goals || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Assists:{" "}
                                        </span>
                                        {player.assists || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Total passes:{" "}
                                        </span>
                                        {player.total_passes || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Committed fouls:{" "}
                                        </span>
                                        {player.committed_fouls || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Drawn fouls:{" "}
                                        </span>
                                        {player.drawn_fouls || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Successful dribbles:{" "}
                                        </span>
                                        {player.success_dribbles || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Won duels:{" "}
                                        </span>
                                        {player.won_duels || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Scored penalties:{" "}
                                        </span>
                                        {player.scored_penalties || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Missed penalties:{" "}
                                        </span>
                                        {player.missed_penalties || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Yellow cards:{" "}
                                        </span>
                                        {player.yellow_cards || 0}
                                    </p>
                                    <p>
                                        <span style={{ color: "black" }}>
                                            Red cards:{" "}
                                        </span>
                                        {player.red_cards || 0}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <p style={{ color: "#3ab54a" }}>
                        Winning Eleven special score: {player.totalPoints}
                    </p>
                    <button className="button" onClick={closePopup}>
                        Close player stats
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => deletePlayer(player)}
                    >
                        Delete player
                    </button>
                </div>
            )}
        </>
    );
}
