const express = require("express");
const router = new express.Router();

const db = require("../db");

router.post("/addplayer", async (req, res) => {
    try {
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

router.post("/delete", async (req, res) => {
    let deletedPlayer = await db.deletePlayer(req.body.id);
    res.json(deletedPlayer);
});

module.exports = router;