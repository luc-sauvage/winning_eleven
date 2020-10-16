DROP TABLE IF EXISTS roster CASCADE;

CREATE TABLE roster(
      id SERIAL PRIMARY KEY,
      player_id INT NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      photo_url VARCHAR,
      age INT,
      height VARCHAR(255),
      weight VARCHAR(255),
      nationality VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );