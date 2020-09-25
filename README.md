# Test Technique Memory Game
Jeu memory, réalisé dans le cadre du test technique de l'école O'Clock

Le but : trouver toutes les 14 paires en 5 minutes !

## Installer le jeu
1. Télécharger le code

2. Créer la base de donnée pour le jeu, le script memory_game.sql contient la structure nécessaire au projet.

3. Installer les fichier composer avec la commande suivante: 
    ```bash
       $ composer install
      ```
4. Créer le fichier .env contenant les informations de connexion à votre base de donnée à l'aide du fichier .env.example
    ```shell
       DATABASE_DSN=mysql:host=hostname;dbname=dbname
       DATABASE_USER=db_username
       DATABASE_PASSWORD=db_password
      ```
5. Il ne vous reste plus qu'à jouer ! 
