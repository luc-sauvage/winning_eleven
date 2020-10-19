const express = require("express");
const app = express();
const db = require("./db");
const uidSafe = require("uid-safe");
const { logic } = require("./logic.js");
const mockStats = require("./final_stats.json");
const { compare, hash } = require("./bc");
const csurf = require("csurf");
const axios = require("axios");
// const xRapidapiHost = require("./secrets.json");
// const xRapidapiKey = require("./secrets.json");

const { xRapidapiHost, xRapidapiKey } = require("./secrets.json");
var cookieSession = require("cookie-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, // tempo massmo durata sessione
    })
);

// csurf cross site security

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// general redirection middleware
app.use((req, res, next) => {
    if (
        !req.session.userId &&
        req.url != "/login" &&
        req.url != "/registration" &&
        req.url != "/register"
    ) {
        res.redirect("/login");
        console.log("not logged in, redirecting");
    } else {
        next();
    }
});

// counting the numbers of players in the roster, deactivating "add to roster" if > 25
app.get("/checkroster", (req, res) => {
    db.checkRoster()
        .then(({ rows }) => {
            res.json(rows[0].count);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/stats/:matchDay", (req, res) => {
    db.fetchStats().then((dbStatResponse) => {
        console.log("stats db response:", dbStatResponse.rows);
        if (dbStatResponse.rows[0].match_day === null) {
            db.setMatchDay(req.params.matchDay).then((dbStatSecondResponse) => {
                const logicResults = logic(
                    dbStatSecondResponse.rows,
                    req.params.matchDay
                );
                console.log("logicResults matchDay just added: ", logicResults);
                /* res.json(logicResults); */
            });
        } else if (dbStatResponse.rows[0].match_day === req.params.matchDay) {
            // this is the query for when stats have already been fetched from API and stored in database
            // remember to call the statistics table column "match_day"

            const logicResults = logic(
                dbStatResponse.rows,
                req.params.matchDay
            );
            console.log("logicResults matchDay didn't change: ", logicResults);
            /* res.json(logicResults); */
        } else {
            console.log("updating stats");
            const playerIds = dbStatResponse.rows.map((player) => {
                const playerId = player.player_id;
                return playerId;
            });
            console.log("logging playerId array: ", playerIds);
            const allPlayersInfo = [];
            for (let playerId of playerIds) {
                const playerInfo = axios.get(
                    `https://v3.football.api-sports.io/players?id=${playerId}&season=2020`,
                    // attenzione che sta query tira su anche i dati delle coppe
                    {
                        headers: {
                            "x-rapidapi-host": xRapidapiHost,
                            "x-rapidapi-key": xRapidapiKey,
                        },
                    }
                );
                console.log("playerInfo: ", playerInfo);

                allPlayersInfo.push(playerInfo);
            }
            Promise.all(allPlayersInfo)
                .then((arrOfResults) => {
                    console.log("promise resolved");
                    console.log("arrOfResults: ", arrOfResults);
                    return arrOfResults.map((result) => {
                        return result.data.response[0];
                    });
                })
                .then((results) => {
                    console.log("results: ", results);
                    console.log("results player info", results[0].player);
                    console.log("results player stats", results[0].statistics);

                    //dentro ad un loop probabilmente

                    for (let result of results) {
                        const selectedPlayerPlayerInfo = result.player;
                        const selectedPlayerStatistics = result.statistics[0];

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
                        );
                    }
                })
                .then(() => {
                    db.fetchStats().then((dbResponseAfterUpdating) => {
                        const logicResults = logic(
                            dbResponseAfterUpdating.rows,
                            req.params.matchDay
                        );
                        console.log(
                            "logicResults matchDay didn't change: ",
                            logicResults
                        );
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

/// post routes
app.post("/register", (req, res) => {
    console.log("register route running");
    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.email ||
        !req.body.pass ||
        !req.body.email.includes("@")
    ) {
        console.log("error");
        res.json({ success: false });
    } else {
        hash(req.body.pass)
            .then((hashedPw) => {
                console.log("req.body", req.body);
                return db.addUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPw
                );
            })
            .then((registrationReturn) => {
                console.log("registrationReturn", registrationReturn);
                req.session.userId = registrationReturn.rows[0].id;
                req.session.firstName = registrationReturn.rows[0].first;
                res.json({ success: true });
            })
            .catch((e) => {
                console.log("e: ", e);
                res.json(e);
            });
    }
});

app.post("/login", (req, res) => {
    if (!req.body.email || !req.body.pass || !req.body.email.includes("@")) {
        res.json({ success: false });
        console.log("ERROR while Logging in: ");
        console.log("req.body.email: ", req.body.email);
        console.log("req.body.pass: ", req.body.pass);
    } else {
        db.getPassword(req.body.email)
            .then((returnedPassword) => {
                console.log("returnedPassword: ", returnedPassword);
                console.log("req.body.email: ", req.body.email);
                console.log("req.body.pass: ", req.body.pass);
                console.log("Password is back from DB!");
                const userId = returnedPassword.rows[0].id;
                const firstName = returnedPassword.rows[0].first;
                compare(req.body.pass, returnedPassword.rows[0].password)
                    .then((comparedValues) => {
                        if (comparedValues === true) {
                            req.session.userId = userId;
                            req.session.firstName = firstName;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((e) => {
                        console.log("e: ", e);
                        res.json(e);
                    });
            })
            .catch((e) => {
                console.log("e: ", e);
                res.json(e);
            });
    }
});

app.post("/addplayer", async (req, res) => {
    try {
        console.log("data from selected player: ", req.body);
        const playerAddResponse = await db.addPlayer(
            req.body.player_id,
            req.body.firstname,
            req.body.lastname,
            req.body.photo_url,
            req.body.age,
            req.body.height,
            req.body.weight,
            req.body.nationality,
            req.body.injured,
            req.body.position,
            req.body.rating,
            req.body.appearences,
            req.body.lineups,
            req.body.minutes,
            req.body.total_goals,
            req.body.conceded_goals,
            req.body.assists,
            req.body.saves,
            req.body.total_passes,
            req.body.key_passes,
            req.body.accuracy_passes,
            req.body.total_tackles,
            req.body.total_blocks,
            req.body.total_interceptions,
            req.body.total_duels,
            req.body.won_duels,
            req.body.attempted_dribbles,
            req.body.success_dribbles,
            req.body.drawn_fouls,
            req.body.committed_fouls,
            req.body.yellow_cards,
            req.body.yellowred_cards,
            req.body.red_cards,
            req.body.won_penalties,
            req.body.commited_penalties,
            req.body.scored_penalties,
            req.body.missed_penalties,
            req.body.saved_penalties,
            req.session.userId
        );
        res.json(playerAddResponse.rows);
    } catch (error) {
        console.log("error: ", error);
    }
});

app.listen(8080, function () {
    console.log("winning 11 server running");
});
