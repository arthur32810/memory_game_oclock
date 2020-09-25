<?php

    require __DIR__.'/vendor/autoload.php'; //On récupére l'autoload

    use App\Controller\MainController;


    $dotEnv = \Dotenv\Dotenv::createImmutable(__DIR__);
    $dotEnv->load(); //Récupére les informations du fichier .env

    $mainController = new MainController(); //On appelle la classe mainController


    if (isset($_GET['action'])) //On regarde si un paramètre action est défini
    {
        if ($_GET['action'] == 'postTimeGame' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $mainController->postTimeGame(); //Si le paramètre action vaut postTimeGame et la méthode de requête est POST, on appelle la fonction postTimeGame
        }

    } else {
        $mainController->index(); //on appelle la fonction index
    }