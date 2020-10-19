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

module.exports.addPlayer = (
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
    user_id
) => {
    const q = `INSERT into roster (
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
        user_id)
        values ($1, 
            $2, 
            $3, 
            $4, 
            $5, 
            $6, 
            $7, 
            $8, 
            $9, 
            $10, 
            $11, 
            $12, 
            $13, 
            $14, 
            $15, 
            $16, 
            $17, 
            $18, 
            $19, 
            $20, 
            $21, 
            $22, 
            $23, 
            $24, 
            $25, 
            $26, 
            $27, 
            $28,
            $29, 
            $30,
            $31,
            $32,
            $33,
            $34,
            $35,
            $36,
            $37,
            $38,
            $39) RETURNING *`;

    const params = [
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
        user_id,
    ];
    return db.query(q, params);
};

module.exports.checkRoster = () => {
    const q = `SELECT COUNT(*) FROM roster`;
    return db.query(q);
};

module.exports.fetchStats = () => {
    const q = `SELECT * FROM roster`;
    return db.query(q);
};

module.exports.setMatchDay = (matchDay) => {
    const q = `UPDATE roster 
        SET match_day = $1 
        RETURNING *`;
    const params = [matchDay];
    return db.query(q, params);
};
