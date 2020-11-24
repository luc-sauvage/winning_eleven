const express = require("express");
const router = new express.Router();
const axios = require("axios");

const db = require("../db");

const { logic } = require("../logic.js");

const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");

router.get("/stats/:matchDay", (req, res) => {
    db.fetchStats(req.session.userId)
        .then((dbStatResponse) => {
            if (
                dbStatResponse.rows[dbStatResponse.rows.length - 1]
                    .match_day === null
            ) {
                db.setMatchDay(req.params.matchDay, req.session.userId).then(
                    (dbStatSecondResponse) => {
                        const logicResults = logic(
                            dbStatSecondResponse.rows,
                            req.params.matchDay
                        );
                        res.json(logicResults);
                    }
                );
            } else if (
                dbStatResponse.rows[0].match_day == req.params.matchDay
            ) {
                const logicResults = logic(
                    dbStatResponse.rows,
                    req.params.matchDay
                );
                res.json(logicResults);
            } else {
                const playerIds = dbStatResponse.rows.map((player) => {
                    const playerId = player.player_id;
                    return playerId;
                });
                const allPlayersInfo = [];
                for (let playerId of playerIds) {
                    const playerInfo = axios.get(
                        `https://v3.football.api-sports.io/players?id=${playerId}&league=135&season=2020`,
                        {
                            headers: {
                                "x-rapidapi-host": xRapidapiHost,
                                "x-rapidapi-key": xRapidapiKey,
                            },
                        }
                    );

                    allPlayersInfo.push(playerInfo);
                }
                Promise.all(allPlayersInfo)
                    .then((arrOfResults) => {
                        return arrOfResults.map((result) => {
                            return result.data.response[0];
                        });
                    })
                    .then((results) => {

                        const arrayOfUpdatePromises = [];

                        for (let result of results) {
                            const selectedPlayerPlayerInfo = result.player;
                            const selectedPlayerStatistics =
                                result.statistics[0];

                            let {
                                id: player_id,
                                firstname,
                                lastname,
                                photo: photo_url,
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
                            let match_day = req.params.matchDay;

                            arrayOfUpdatePromises.push(
                                db.updatePlayerStats(
                                    player_id,
                                    firstname,
                                    lastname,
                                    photo_url,
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
                                    match_day
                                )
                            );
                        }

                        return Promise.all(arrayOfUpdatePromises);
                    })
                    .then(() => {
                        db.fetchStats().then((dbResponseAfterUpdating) => {
                            const logicResults = logic(
                                dbResponseAfterUpdating.rows,
                                req.params.matchDay
                            );
                            res.json(logicResults);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router; 