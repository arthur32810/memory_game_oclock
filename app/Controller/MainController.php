<?php

namespace App\Controller;

use App\Entity\TimeGameEntity;
use App\EntityManager\DbFactory;
use App\EntityManager\TimeGameEntityManager;

class MainController
{

    public function index() // Controlleur de la page d'accueil
    {
        $timeGameManager = new TimeGameEntityManager(DbFactory::load()); //On récupére le manager TimeGameEntityManager
        $bestTime = $timeGameManager->selectBestTimeGame(); //On appelle la fonction pour récupérer les parties enregistrées

        require('app/view/gameView.php'); // On récupére la vue
    }

    public function postTimeGame() // Controller qui enregistre en base de donnée le temps de jeu
    {
        //récupére les données envoyées
        $request = file_get_contents('php://input');
        $data = json_decode($request, true); // décode la réponse json dans un tableau

        $date = new \DateTime($data['dateTime']); //Transforme la réponse en date

        $timeGame = new TimeGameEntity(); //Récupére l'entitée TimeGame
        $timeGame->setTime($date); // on insére la durée de la partie dans l'entitée


        $timeGameManager = new TimeGameEntityManager(DbFactory::load()); //On récupére le manager  TimeGameEntityManager
        $timeGameManager->insertTimegame($timeGame); //On appelle la fonction d'insertion de donnée
    }

}