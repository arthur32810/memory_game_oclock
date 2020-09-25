--Créer la base de donnée et la table memory_game indispensable pour le jeu

CREATE DATABASE memory_game;

CREATE TABLE IF NOT EXISTS time_game(
  id int(11) NOT NULL,
  time datetime NOT NULL,
  PRIMARY KEY (id)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8;