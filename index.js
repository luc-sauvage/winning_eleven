const express = require("express");
const app = express();
const db = require("./db");

const csurf = require("csurf");

const loggedOutRoutes = require("./routes/loggedout-routes.js");
const rosterRoutes = require("./routes/roster-routes.js"); 
const matchDayRoutes = require("./routes/matchday-routes.js");
const playerRoutes = require("./routes/player-routes.js");

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

app.use(loggedOutRoutes);
app.use(rosterRoutes);
app.use(matchDayRoutes);
app.use(playerRoutes);

// general redirection middleware
app.use((req, res, next) => {
    if (
        !req.session.userId &&
        req.url != "/login" &&
        req.url != "/registration" &&
        req.url != "/register" && 
        req.url != "/resetpassword" &&
        req.url != "/password/reset/start" && 
        req.url != "/password/reset/set"
    ) {
        res.redirect("/login");
    } else {
        next();
    }
});


app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("winning 11 server running");
});
