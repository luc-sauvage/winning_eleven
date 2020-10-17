DROP TABLE IF EXISTS statistics CASCADE;

CREATE TABLE statistics(
      id SERIAL PRIMARY KEY,
      player_id INT,
      rating DECIMAL,
      goals INT,
      assists INT,
      success_dribbles INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );