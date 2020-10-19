const express = require("express");
const app = express();
const db = require("./db");
const uidSafe = require("uid-safe");
const { logic } = require("./logic.js");
const mockStats = require("./final_stats.json");
const { compare, hash } = require("./bc");
const csurf = require("csurf");

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
        if (dbStatResponse.rows.length == 0) {
            /// this query must take place if statistics table is still empty
        } else if (dbStatResponse.rows[0].match_day === req.params.matchDay) {
            // this is the query for when stats have already been fetched from API and stored in database
            // remember to call the statistics table column "match_day"
            const logicResults = logic(
                dbStatResponse.rows,
                req.params.matchDay
            );
            res.json(logicResults);
        } else {
        }

        console.log("matchDay", req.params.matchDay);

        console.log("logic Results: ", logicResults);
        // res.json(logicResults);
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
            req.body.nationality
        );
        res.json(playerAddResponse.rows);
    } catch (error) {
        console.log("error: ", error);
    }
});

app.listen(8080, function () {
    console.log("winning 11 server running");
});
