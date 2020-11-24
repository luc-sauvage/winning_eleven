const express = require("express");
const router = new express.Router();

const db = require("../db");

router.get("/checkroster", (req, res) => {
    db.checkRoster(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0].count);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/current-roster", (req, res) => {
    db.fetchStats(req.session.userId).then((returnedRosterInfo) => {
        res.json(returnedRosterInfo.rows);
    });
});

module.exports = router; 