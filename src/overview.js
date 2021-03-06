import { WorkDocs } from "aws-sdk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setMatchDay,
    setWinningTeam,
    setPopupState,
    setPopupStats,
} from "./actions";
import axios from "./axios";
import PlayerStats from "./player-stats-popup";
import { Link } from "react-router-dom";
const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");

export default function Overview() {
    const dispatch = useDispatch();
    const matchDay = useSelector((state) => state.matchDay);
    const ranking = useSelector((state) => state.playerRanking);
    const popup = useSelector((state) => state.popupState);

    const filterGoalkeepers =
        ranking &&
        ranking.filter(
            (player) => !player.injured && player.position == "Goalkeeper"
        );
    const filterDefenders =
        ranking &&
        ranking.filter(
            (player) => !player.injured && player.position == "Defender"
        );
    const filterMidfielders =
        ranking &&
        ranking.filter(
            (player) => !player.injured && player.position == "Midfielder"
        );
    const filterAttackers =
        ranking &&
        ranking.filter(
            (player) => !player.injured && player.position == "Attacker"
        );
    const filterInjuredPlayers =
        ranking && ranking.filter((player) => player.injured == true);

    useEffect(() => {
        // query to fetch the current round in the league - COMPLETE
        axios
            .get(
                "https://v3.football.api-sports.io/fixtures/rounds?league=135&season=2020&current=true",
                {
                    headers: {
                        "x-rapidapi-host": xRapidapiHost,
                        "x-rapidapi-key": xRapidapiKey,
                    },
                }
            )
            .then((matchDayResponse) => {
                console.log(
                    "response for matchDay",
                    matchDayResponse.data.response[0]
                );
                const matchDayArray = matchDayResponse.data.response[0].match(
                    /(\d+)/
                );
                const fetchedMatchDay = matchDayArray[0];
                console.log("matchDay - 1", fetchedMatchDay);
                dispatch(setMatchDay(fetchedMatchDay));
                return fetchedMatchDay;
            })
            .then((fetchedMatchDay) => {
                console.log("matchDay - 2", fetchedMatchDay);
                axios
                    .get(`/stats/${fetchedMatchDay}`)
                    .then((serverResponse) => {
                        console.log(
                            "serverResponse - stats",
                            serverResponse.data
                        );

                        function compareTotalpoints(a, b) {
                            return b.totalPoints - a.totalPoints;
                        }

                        let rankedPlayersArray = [...serverResponse.data];

                        rankedPlayersArray.sort(compareTotalpoints);

                        dispatch(setWinningTeam(rankedPlayersArray));
                    });
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    function openPopup(playerInfo) {
        console.log("playerInfo: ", playerInfo);
        dispatch(setPopupState(true));
        dispatch(setPopupStats(playerInfo));
    }

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <img
                        className="navbar-logo"
                        src="/images/logowinning11_navbar.png"
                    ></img>
                </Link>
                <a className="logout-button" href="/logout">
                    Logout
                </a>
            </div>
            {/* <h1>Your team</h1> */}
            <div className="big-results-container">
                {!ranking && (
                    <img className="loader" src="/images/loader.gif"></img>
                )}
                {ranking && (
                    <>
                        <div className="role-filtered-results">
                            <h3 className="role-title-section">Goalkeepers</h3>
                            {filterGoalkeepers &&
                                filterGoalkeepers.map((rankedGoalkeeper, i) => {
                                    return (
                                        <div
                                            className="single-role-result"
                                            key={i}
                                            onClick={() =>
                                                openPopup(rankedGoalkeeper)
                                            }
                                        >
                                            <img
                                                className="current-roster-img"
                                                src={rankedGoalkeeper.photo_url}
                                            ></img>
                                            <div className="single-role-text-results">
                                                <p>
                                                    {rankedGoalkeeper.firstname}{" "}
                                                    {rankedGoalkeeper.lastname}{" "}
                                                </p>
                                                {rankedGoalkeeper.appearences ? (
                                                    <p>
                                                        {
                                                            rankedGoalkeeper.totalPoints
                                                        }
                                                    </p>
                                                ) : (
                                                    <p style={{ color: "red" }}>
                                                        Did not play yet
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="role-filtered-results">
                            <h3 className="role-title-section">Defender</h3>
                            {filterDefenders &&
                                filterDefenders.map((rankedDefender, i) => {
                                    return (
                                        <div
                                            className="single-role-result"
                                            key={i}
                                            onClick={() =>
                                                openPopup(rankedDefender)
                                            }
                                        >
                                            <img
                                                className="current-roster-img"
                                                src={rankedDefender.photo_url}
                                            ></img>
                                            <div className="single-role-text-results">
                                                <p>
                                                    {rankedDefender.firstname}{" "}
                                                    {rankedDefender.lastname}
                                                </p>
                                                {rankedDefender.appearences ? (
                                                    <p>
                                                        {
                                                            rankedDefender.totalPoints
                                                        }
                                                    </p>
                                                ) : (
                                                    <p style={{ color: "red" }}>
                                                        Did not play yet
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="role-filtered-results">
                            <h3 className="role-title-section">Midfielder</h3>
                            {filterMidfielders &&
                                filterMidfielders.map((rankedMidfielder, i) => {
                                    return (
                                        <div
                                            className="single-role-result"
                                            key={i}
                                            onClick={() =>
                                                openPopup(rankedMidfielder)
                                            }
                                        >
                                            <img
                                                className="current-roster-img"
                                                src={rankedMidfielder.photo_url}
                                            ></img>
                                            <div className="single-role-text-results">
                                                <p>
                                                    {rankedMidfielder.firstname}{" "}
                                                    {rankedMidfielder.lastname}{" "}
                                                </p>
                                                {rankedMidfielder.appearences ? (
                                                    <p>
                                                        {
                                                            rankedMidfielder.totalPoints
                                                        }
                                                    </p>
                                                ) : (
                                                    <p style={{ color: "red" }}>
                                                        Did not play yet
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="role-filtered-results">
                            <h3 className="role-title-section">Attacker</h3>
                            {filterAttackers &&
                                filterAttackers.map((rankedAttacker, i) => {
                                    return (
                                        <div
                                            className="single-role-result"
                                            key={i}
                                            onClick={() =>
                                                openPopup(rankedAttacker)
                                            }
                                        >
                                            <img
                                                className="current-roster-img"
                                                src={rankedAttacker.photo_url}
                                            ></img>
                                            <div className="single-role-text-results">
                                                <p>
                                                    {rankedAttacker.firstname}{" "}
                                                    {rankedAttacker.lastname}{" "}
                                                </p>
                                                {rankedAttacker.appearences ? (
                                                    <p>
                                                        {
                                                            rankedAttacker.totalPoints
                                                        }
                                                    </p>
                                                ) : (
                                                    <p style={{ color: "red" }}>
                                                        Did not play yet
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="role-filtered-results">
                            <h3 className="role-title-section">
                                Injured players
                            </h3>
                            {(filterInjuredPlayers &&
                                filterInjuredPlayers.length > 0 &&
                                filterInjuredPlayers.map((rankedInjured, i) => {
                                    return (
                                        <div
                                            className="single-role-result"
                                            key={i}
                                            onClick={() =>
                                                openPopup(rankedInjured)
                                            }
                                        >
                                            <img
                                                className="current-roster-img"
                                                src={rankedInjured.photo_url}
                                            ></img>
                                            <div className="single-role-text-results">
                                                <p>
                                                    {rankedInjured.firstname}{" "}
                                                    {rankedInjured.lastname}{" "}
                                                </p>
                                                {rankedInjured.appearences ? (
                                                    <p>
                                                        {
                                                            rankedInjured.totalPoints
                                                        }
                                                    </p>
                                                ) : (
                                                    <p style={{ color: "red" }}>
                                                        Did not play yet
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })) || (
                                <p className="no-injuries">
                                    GOOD NEWS!<br></br> No injured players at
                                    the moment.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
            {popup && (
                <div>
                    <div className="popup-layer"></div>
                    <PlayerStats />
                </div>
            )}
        </>
    );
}
