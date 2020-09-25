<?php


namespace App\EntityManager;


use Exception;
use PDO;

class DbFactory
{
    public static function load() //Connexion à la base de donnée
    {
        try {
            $db = new PDO($_ENV['DATABASE_DSN'], $_ENV['DATABASE_USER'], $_ENV['DATABASE_PASSWORD']); //Génére la connexion depuis les parametre .env
        } catch (Exception $ex) {
            die('Error : ' . $ex->getMessage());
        }
        return $db;
    }

}