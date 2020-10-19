import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchDay } from "./actions";
import axios from "./axios";
const { xRapidapiHost, xRapidapiKey } = require("../secrets.json");

export default function Overview() {
    const dispatch = useDispatch();
    const matchDay = useSelector((state) => state.matchDay);
    const state = useSelector((state) => state);

    useEffect(() => {
        // query to fetch games played by single teams... in this specific case first team in ranking - INCOMPLETE
        // axios.get(
        //     `https://v3.football.api-sports.io/standings?league=135&season=2020`,
        //     {
        //         headers: {
        //             "x-rapidapi-host": "v3.football.api-sports.io",
        //             "x-rapidapi-key":
        //                 "4e1921e65c5733449f4bfbfc9eb4616c",
        //         },
        //     }).then((matchDayResponse) => {
        //         console.log("response for matchDay", matchDayResponse);
        //         console.log("matchDay with standings query", matchDayResponse.response[0].league.standings[0]);
        //         const standings = matchDayResponse.response[0].league.standings[0];
        //         const matchDay = standings[0].all.played;
        //     }).catch((error) => console.log("error: ", error));

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
                        console.log(serverResponse.data);
                    });
            })
            .catch((error) => console.log("error: ", error));
    }, []);

    return <h1>HELLO ALE & LUCA</h1>;
}
