import { WorkDocs } from "aws-sdk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchDay, setWinningTeam } from "./actions";
import axios from "./axios";
const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");

export default function Overview() {
    const dispatch = useDispatch();
    const matchDay = useSelector((state) => state.matchDay);
    const ranking = useSelector((state) => state.playerRanking);

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

                        // let filterHealthyPlayers = rankedPlayersArray.filter(
                        //     (player) => player.injured == false
                        // );

                        // console.log(
                        //     "filterHealthyPlayers: ",
                        //     filterHealthyPlayers
                        // );

                        // filterHealthyPlayers.sort(compareTotalpoints);

                        rankedPlayersArray.sort(compareTotalpoints);

                        dispatch(setWinningTeam(rankedPlayersArray));
                    });
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    console.log("ranking: ", ranking);
    console.log("filterGoalkeepers: ", filterGoalkeepers);
    console.log("filterDefenders: ", filterDefenders);
    console.log("filterMidfielders: ", filterMidfielders);
    console.log("filterAttackers: ", filterAttackers);
    console.log("filterInjuredPlayers: ", filterInjuredPlayers);

    return (
        <>
            <div className="navbar">
                <img
                    className="navbar-logo"
                    src="/images/logowinning11_navbar.png"
                ></img>
            </div>
            {/* <h1>Your team</h1> */}
            <div className="big-results-container">
                {/* {ranking &&
                    ranking.map((rankedPlayer, i) => {
                        return (
                            <div key={i}>
                                {rankedPlayer.firstname} {rankedPlayer.lastname}{" "}
                                {rankedPlayer.totalPoints}
                            </div>
                        );
                    })} */}
                <div className="role-filtered-results">
                    <h3 className="role-title-section">Goalkeepers</h3>
                    {filterGoalkeepers &&
                        filterGoalkeepers.map((rankedGoalkeeper, i) => {
                            return (
                                <div className="single-role-result" key={i}>
                                    <img
                                        className="current-roster-img"
                                        src={rankedGoalkeeper.photo_url}
                                    ></img>
                                    <div className="single-role-text-results">
                                        <p>
                                            {rankedGoalkeeper.firstname}{" "}
                                            {rankedGoalkeeper.lastname}{" "}
                                        </p>
                                        <p>{rankedGoalkeeper.totalPoints}</p>
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
                                <div className="single-role-result" key={i}>
                                    <img
                                        className="current-roster-img"
                                        src={rankedDefender.photo_url}
                                    ></img>
                                    <div className="single-role-text-results">
                                        <p>
                                            {rankedDefender.firstname}{" "}
                                            {rankedDefender.lastname}
                                        </p>
                                        <p>{rankedDefender.totalPoints}</p>
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
                                <div className="single-role-result" key={i}>
                                    <img
                                        className="current-roster-img"
                                        src={rankedMidfielder.photo_url}
                                    ></img>
                                    <div className="single-role-text-results">
                                        <p>
                                            {rankedMidfielder.firstname}{" "}
                                            {rankedMidfielder.lastname}{" "}
                                        </p>
                                        <p>{rankedMidfielder.totalPoints}</p>
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
                                <div className="single-role-result" key={i}>
                                    <img
                                        className="current-roster-img"
                                        src={rankedAttacker.photo_url}
                                    ></img>
                                    <div className="single-role-text-results">
                                        <p>
                                            {rankedAttacker.firstname}{" "}
                                            {rankedAttacker.lastname}{" "}
                                        </p>
                                        <p>{rankedAttacker.totalPoints}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="role-filtered-results">
                    <h3 className="role-title-section">Injured players</h3>
                    {(filterInjuredPlayers &&
                        filterInjuredPlayers.length > 0 &&
                        filterInjuredPlayers.map((rankedInjured, i) => {
                            return (
                                <div className="single-role-result" key={i}>
                                    <img
                                        className="current-roster-img"
                                        src={rankedInjured.photo_url}
                                    ></img>
                                    <div className="single-role-text-results">
                                        <p>
                                            {rankedInjured.firstname}{" "}
                                            {rankedInjured.lastname}{" "}
                                        </p>
                                        <p>{rankedInjured.totalPoints}</p>
                                    </div>
                                </div>
                            );
                        })) || (
                        <p className="no-injuries">
                            GOOD NEWS!<br></br> No injured players at the
                            moment.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
