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

module.exports.checkRoster = (userId) => {
    const q = `SELECT COUNT(*) FROM roster WHERE user_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.fetchStats = (userId) => {
    const q = `SELECT * FROM roster WHERE user_id = $1 ORDER BY id`;
    const params = [userId];
    return db.query(q, params);
}; 

module.exports.setMatchDay = (matchDay, userId) => {
    const q = `UPDATE roster 
        SET match_day = $1 
        WHERE user_id = $2
        RETURNING *`;
    const params = [matchDay, userId];
    return db.query(q, params);
};

module.exports.updatePlayerStats = (
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
) => {
    const q = `UPDATE roster SET
        firstname = $2, 
        lastname = $3,
        photo_url= $4, 
        age = $5,
        height = $6,
        weight = $7, 
        nationality = $8, 
        injured = $9, 
        position = $10,
        rating = $11,
        appearences = $12,
        lineups = $13,
        minutes = $14,
        total_goals = $15,
        conceded_goals = $16,
        assists = $17,
        saves = $18,
        total_passes = $19,
        key_passes = $20,
        accuracy_passes = $21,
        total_tackles = $22,
        total_blocks = $23,
        total_interceptions = $24,
        total_duels = $25,
        won_duels = $26,
        attempted_dribbles = $27,
        success_dribbles = $28,
        drawn_fouls = $29,
        committed_fouls = $30,
        yellow_cards = $31,
        yellowred_cards = $32,
        red_cards = $33,
        won_penalties = $34,
        commited_penalties = $35,
        scored_penalties = $36,
        missed_penalties = $37,
        saved_penalties = $38,
        match_day = $39
        WHERE player_id = $1
        RETURNING *`;

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
        match_day,
    ];
    return db.query(q, params);
};

module.exports.deletePlayer = (playerId) => {
    const q = `DELETE FROM roster
    WHERE id = $1
    RETURNING *`;
    const params = [playerId];
    return db.query(q, params);
};

module.exports.insertCode =  (email, code) => {
    const q = `INSERT into password_reset_codes (email, code)
    values ($1, $2) RETURNING *`;
    const params = [email, code]; 
    return db.query(q, params);
};

module.exports.checkCode = (email) => {
    const q = `SELECT * FROM password_reset_codes 
    WHERE password_reset_codes.email = $1 
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC 
    LIMIT 1
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.changePassword = (email, password) => {
    const q = `UPDATE users 
    SET password = $2
    WHERE email = $1
    RETURNING *`;
    const params = [email, password];
    return db.query(q, params);
};
