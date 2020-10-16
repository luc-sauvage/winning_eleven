const express = require("express");
const app = express();
const db = require("./db");
const uidSafe = require("uid-safe");
var cookieSession = require("cookie-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, // tempo massmo durata sessione
    })
);

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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
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
    console.log("I'm listening.");
});
