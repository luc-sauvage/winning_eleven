const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/winning11");

module.exports.addPlayer = (player_id, firstname, lastname, photo_url, age, height, weight, nationality) => {
    const q = `INSERT into roster (player_id, firstname, lastname, photo_url, age, height, weight, nationality)
        values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const params = [player_id, firstname, lastname, photo_url, age, height, weight, nationality];
    return db.query(q, params);
};

module.exports.checkRoster = () => {
    const q = `SELECT COUNT(*) FROM roster`;
    return db.query(q);
};