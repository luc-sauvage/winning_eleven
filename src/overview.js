import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchDay, setWinningTeam } from "./actions";
import axios from "./axios";
const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");

export default function Overview() {
    const dispatch = useDispatch();
    const matchDay = useSelector((state) => state.matchDay);
    const ranking = useSelector((state) => state.playerRanking);

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

                        console.log("rankedPlayersArray: ", rankedPlayersArray);
                        dispatch(setWinningTeam(rankedPlayersArray));
                    });
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    console.log("ranking: ", ranking);

    return (
        <>
            <h1>RESULTS OVERVIEW PAGE</h1>
            {ranking &&
                ranking.map((rankedPlayer, i) => {
                    return (
                        <div key={i}>
                            {rankedPlayer.firstname} {rankedPlayer.lastname}{" "}
                            {rankedPlayer.totalPoints}
                        </div>
                    );
                })}
        </>
    );
}
