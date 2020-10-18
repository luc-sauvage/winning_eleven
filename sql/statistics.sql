DROP TABLE IF EXISTS statistics CASCADE;

CREATE TABLE statistics(
      id SERIAL PRIMARY KEY,
      player_id INT,
      player_name VARCHAR,
      photo_url VARCHAR,
      position VARCHAR,
      injured BOOLEAN,
      rating DECIMAL,
      appearences INT,
      lineups INT,
      minutes INT,
      goals INT,
      conceded_goals INT,
      assists INT,
      saves INT,
      total_passes INT,
      key_passes INT,
      accuracy_passes INT,
      total_tackles INT,
      total_blocks INT, 
      total_interceptions INT,
      total_duels INT,
      won_duels INT,
      attempted_dribbles INT,
      success_dribbles INT,
      drawn_fouls INT,
      committed_fouls INT,
      yellow_cards INT,
      yellowred_cards INT,
      red_cards INT,
      won_penalties INT,
      committed_penalties INT,
      scored_penalties INT, 
      missed_penalties INT,
      saved_penalties INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );