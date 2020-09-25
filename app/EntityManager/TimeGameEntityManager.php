<?php


namespace App\EntityManager;

use PDO;
use App\Entity\TimeGameEntity;

class TimeGameEntityManager
{
    protected $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function selectBestTimeGame()
    {
        $timeGame=[];

        //On Sélectionne toutes les données depuis la table time_game triées par date croissante dans la limite de 3 temps
        $request = $this->db->query('SELECT * FROM time_game ORDER BY time LIMIT 0, 3');


        if(!empty($request->fetchAll())) //Si le retour n'est pas vide
        {
            while ($data = $request->fetch(PDO::FETCH_ASSOC)) //Pour chaque ligne récupérée -> On crée une entitée TimeGame pour chaque réponse
            {
                $timeGame[] = new TimeGameEntity($data);
            }

            foreach($timeGame as $time)
            {
                $time->setTime(new \DateTime($time->getTime())); //On défini la date en DateTime pour chaque entitée
            }
        }
        else{
            $timeGame = null; // sinon on défini timeGame à null
        }

        return $timeGame; //on retourne le tableau d'entitée
    }

    public function insertTimegame(TimeGameEntity $timeGame)
    {
        $request = $this->db->prepare('INSERT INTO time_game(time) VALUES (:time)'); //Préparation de la requête -> On insére dans la table time_game la valeur time
        $request->execute(['time'=>$timeGame->getTime()->format('Y-m-d H:i:s')]); // execution de la requete avec le temps de jeu au format texte
    }
}