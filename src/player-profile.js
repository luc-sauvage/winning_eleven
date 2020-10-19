import React, { useState, useEffect } from "react";
import axios from "./axios";

import { useDispatch, useSelector } from "react-redux";
import {
    setLastAddedPlayer,
    setPlayersProfiles,
    setFullRoster,
    setSearchResults,
} from "./actions";

export default function PlayerProfile() {
    const dispatch = useDispatch();

    const players = useSelector((state) => state.playersData);
    // const lastAddedPlayer = useSelector((state) => state.lastPlayer);
    // const fullRoster = useSelector((state) => state.fullRoster);

    // const [addedPlayer, setAddedPlayer] = useState();
    // const [fullRoster, setFullRoster] = useState();

    function addPlayer(selectedPlayerInfo) {
        const selectedPlayerPlayerInfo = selectedPlayerInfo.player;
        const selectedPlayerStatistics = selectedPlayerInfo.statistics[0];
        axios
            .get("/checkroster")
            .then((responseCheckRoster) => {
                console.log(responseCheckRoster.data);
                let rosterCount = responseCheckRoster.data;

                if (rosterCount < 25) {
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
                        injured,
                    } = selectedPlayerPlayerInfo;
                    let {
                        position,
                        rating,
                        appearences,
                        lineups,
                        minutes,
                    } = selectedPlayerStatistics.games;
                    let {
                        total: total_goals,
                        conceded: conceded_goals,
                        assists,
                        saves,
                    } = selectedPlayerStatistics.goals;
                    let {
                        total: total_passes,
                        key: key_passes,
                        accuracy: accuracy_passes,
                    } = selectedPlayerStatistics.passes;
                    let {
                        total: total_tackles,
                        blocks: total_blocks,
                        interceptions: total_interceptions,
                    } = selectedPlayerStatistics.tackles;
                    let {
                        total: total_duels,
                        won: won_duels,
                    } = selectedPlayerStatistics.duels;
                    let {
                        attempts: attempted_dribbles,
                        success: success_dribbles,
                    } = selectedPlayerStatistics.dribbles;
                    let {
                        drawn: drawn_fouls,
                        committed: committed_fouls,
                    } = selectedPlayerStatistics.fouls;
                    let {
                        yellow: yellow_cards,
                        yellowred: yellowred_cards,
                        red: red_cards,
                    } = selectedPlayerStatistics.cards;
                    let {
                        won: won_penalties,
                        commited: commited_penalties,
                        scored: scored_penalties,
                        missed: missed_penalties,
                        saved: saved_penalties,
                    } = selectedPlayerStatistics.penalty;
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
                            injured,
                            position,
                            rating,
                            appearences,
                            lineups,
                            minutes,
                            total_goals,
                            conceded_goals,
                            assists,
                            saves,
                            total_passes,
                            key_passes,
                            accuracy_passes,
                            total_tackles,
                            total_blocks,
                            total_interceptions,
                            total_duels,
                            won_duels,
                            attempted_dribbles,
                            success_dribbles,
                            drawn_fouls,
                            committed_fouls,
                            yellow_cards,
                            yellowred_cards,
                            red_cards,
                            won_penalties,
                            commited_penalties,
                            scored_penalties,
                            missed_penalties,
                            saved_penalties,
                        })
                        .then((response) => {
                            console.log("response data:", response.data[0]);
                            if (response.data) {
                                dispatch(setLastAddedPlayer(response.data[0]));
                                dispatch(setPlayersProfiles([]));
                                dispatch(setSearchResults(false));
                            }
                        });
                } else {
                    dispatch(setFullRoster(true));
                    dispatch(setPlayersProfiles([]));
                    dispatch(setSearchResults(false));
                    dispatch(setLastAddedPlayer(false));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="search-results-container">
                {players &&
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
                                <button onClick={() => addPlayer(player)}>
                                    Insert in roster
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
