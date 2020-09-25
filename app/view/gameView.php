<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" href="public/images/favicon.png" />
    <title>Memory Game - Jeu de mémoire </title>
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body>
<h1 class="text-center"> Memory Game - Jeu de mémoire </h1>
<p class="text-center"> Saurez-vous retrouver toutes les paires en 5 minutes...</p>

<div id="best-score">
    <h4> Meilleurs scores</h4>

    <?php
        if($bestTime != null)
        {
            ?>
                <table class="table">
                <tr>
                    <th> Position </th>
                    <th> Chrono </th>
                </tr>

                <?php
                for($index = 0; $index < count($bestTime); $index++) //Affiche les meilleurs temps
                {
                    $time = $bestTime[$index]->getTime(); //récupére le temps
                    ?>

                    <tr>
                        <td> <?= $index+1 ?> </td>
                        <td> <?= $time->format('i').' min '.$time->format('s').' sec'; //Affiche le temps ?></td>
                    </tr>
                    <?php

                }
                ?>
            </table>
            <?php
        }
        else{
            ?>
                <p> Aucune partie gagnée </p>
            <?php
        }
    ?>

</div>



<!-- Affiche le nombre de paire trouvée -->
<p> nombre de paire trouvée : <span id="nombere-paire"> 0 </span></p>

<div id="message-div">
    <!-- message erreur mauvaise paire-->
    <p id="error-card" class="headband"> Les 2 cartes retournées ne sont pas identiques</p>

    <!-- message erreur bonne paire -->
    <p id="good-card" class="headband"> Les 2 cartes sont identiques</p>
</div>

<!-- Affiche un bouton rejouer à la fin de la partie -->
<div id="restart" class="text-center">
    <button onclick="window.location.href='index.php';">  Rejouer </button>
</div>

<!-- Div où sont afficher les cartes -->
<div id="game"></div>

<!-- Affichage du chrono et de la barre de progression -->
<h3 id="chrono"></h3>
<progress id="progressBar"></progress>

<script type="text/javascript" src="public/js/chrono.js"></script>
<script type="text/javascript" src="public/js/progressBar.js"></script>
<script type="text/javascript" src="public/js/cards.js"></script>

</body>
</html>