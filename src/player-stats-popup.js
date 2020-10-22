import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupState } from "./actions";

export default function PlayerStats() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.popupStats);

    function closePopup() {
        dispatch(setPopupState(false));
    }

    return (
        <>
            {player && (
                <div className="popup">
                    <div className="popup-left-column">
                        <img className="popup-pic" src={player.photo_url}></img>
                        <div className="popup-player-info">
                            <p>
                                {player.firstname} {player.lastname}
                            </p>
                            <p>{player.age}</p>
                            <p>{player.height}</p>
                            <p>{player.weight}</p>
                            <p>{player.nationality}</p>
                            <p>{player.position}</p>
                            <p>{player.injured}</p>
                            <p>{player.totalPoints}</p>
                        </div>
                    </div>
                    <div className="popup-right-column">
                        {player.position === "Goalkeeper" ? (
                            <div>
                                <p>Appearences: {player.appearences || 0}</p>
                                <p>Minutes played: {player.minutes || 0}</p>
                                <p>
                                    Conceded goals: {player.conceded_goals || 0}
                                </p>
                                <p>
                                    Committed penalties:{" "}
                                    {player.commited_penalties || 0}
                                </p>
                                <p>
                                    Saved penalties:{" "}
                                    {player.saved_penalties || 0}
                                </p>
                                <p>
                                    Committed fouls:{" "}
                                    {player.committed_fouls || 0}
                                </p>
                                <p>Saves: {player.saves || 0}</p>
                                <p>Yellow cards: {player.yellow_cards || 0}</p>
                                <p>Red cards: {player.red_cards || 0}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Appearences: {player.appearences || 0}</p>
                                <p>Minutes played: {player.minutes || 0}</p>
                                <p>Goals: {player.total_goals || 0}</p>
                                <p>Assists: {player.assists || 0}</p>
                                <p>Total passes {player.total_passes || 0}</p>
                                <p>
                                    Committed fouls:{" "}
                                    {player.committed_fouls || 0}
                                </p>
                                <p>Drawn fouls: {player.drawn_fouls || 0}</p>
                                <p>
                                    Successful dribbles:{" "}
                                    {player.success_dribbles || 0}
                                </p>
                                <p>Won duels: {player.won_duels || 0}</p>
                                <p>
                                    Scored penalties:{" "}
                                    {player.scored_penalties || 0}
                                </p>
                                <p>
                                    Missed penalties:{" "}
                                    {player.missed_penalties || 0}
                                </p>
                                <p>Yellow cards: {player.yellow_cards || 0}</p>
                                <p>Red cards: {player.red_cards || 0}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={closePopup}>Close player stats</button>
                </div>
            )}
        </>
    );
}
