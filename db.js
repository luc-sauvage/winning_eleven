const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/winning11");

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT into users (first, last, email, password)
        values ($1, $2, $3, $4) RETURNING *`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getPassword = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

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

module.exports.fetchStats = () => {
    const q = `SELECT * FROM statistics`;
    return db.query(q);
}