//Nom de nos figures (fruits)
var figureCard = ['apple','banana','orange','green-lemon','beet','peach','lemon','strawberry','green-apple','apricot','grape','watermelon','fig','pear','cherry','raspberry','mango','yellow-cherry'];

//on sélectionne 14 figures aleatoire
figureCard = randomize(figureCard).slice(0,14);
var tabCard = figureCard.concat(figureCard); //On copie les images pour faire des paires

var clic=0; //Nombre de clics
var paires=0; //nombre de paire réussie
var firstChoice; //memorise la premiere carte cliquée
var secondChoice; //memorise la deuxiéme carte cliquée

var chronoStart = false; //Permet de savoir si le chrono est lancé ou non
var playingTime = 60*5; //5 minutes de jeu
var stopGameIntervalId; //stocke l'id de la fonction setInterval

tabCard = randomize(tabCard); // on mélange les cartes figures
displayCard(); //On affiche les cartes

var figures = document.getElementById('game').childNodes; //on récupére les figures

for(var i=0; i<figures.length; i++)
{
    figures[i].addEventListener('click', function(element){
        choice(element.target);
    }); //on ajoute un évènement au clic sur la figure, execute la fonction choice
}

//On ajoute les cartes au plateau
function displayCard()
{
    for(var i=0; i < tabCard.length; i++)
    {
        document.getElementById('game').innerHTML += '<figure class="card" data-indexcard="'+i+'"></figure>' //on crée une figure qu'on ajoute à la div game
    }
}

//On mélange les paramètres du tableau à l'aide de l'algortihme de Fisher-Yates
function randomize(tabCard)
{
    var indexCard, newIndexCard, tmp;
    for(indexCard=tabCard.length-1; indexCard>0; indexCard--) // pour indexCard -> longeur du tableau, indexCard toujours positif
    {
        newIndexCard = Math.floor(Math.random()*(indexCard+1)); //Math.Floor arrondie la valeur récupére par Math.random
        tmp= tabCard[indexCard]; //On stocke en mémoire la valeure actuelle du tableau
        tabCard[indexCard] = tabCard[newIndexCard]; //On échange les valeurs
        tabCard[newIndexCard] = tmp; //on remet l'ancienne valeur à la position remplacée
    }

    return tabCard;
}

function choice(card)
{

    if(chronoStart===false) //si le chrono n'est pas lancé
    {
        initializeChrono(); //on initaliase le chono
        startChrono(); //on démarre le chrono
        chronoStart = true; //on indique que le chrono est lancé

        initializeProgressionBar(playingTime); //on initialise la bare de progression
        startProgressBar(1000); //on démarre la barre de progression
        document.getElementById('progressBar').style.visibility='visible'; //on affiche la barre de progression

        stopGameIntervalId = setInterval('stopGame()', 1000);//chaque seconde on vérifie le chrono
    }

    if(clic==2) //après le deuxième clic, il ne se passe rien
    {
        return;
    }
    if(clic==0) //Premier clic
    {
        clic=1; //on passe le nombre de clic à 1

        displayCardFigure(card); //Affiche la figure
        firstChoice = card; //enregistre la première image

    }
    else //Deuxième clic
    {
        clic=2; //on passe le nombre de clic à 2

        displayCardFigure(card); //Affiche la figure
        secondChoice = card;//enregistre la deuxième image
        setTimeout('verif()', 1000);//Lance la vérification après une seconde d'attente en appelant la fonction verif
    }
}

function displayCardFigure(card)
{
    var indexCard = card.dataset.indexcard; //on récupére l'index de la carte cliquée
    card.classList.add('card-reverse' , 'card-'+tabCard[indexCard]); //On applique les classes card-reverse et la carte de la figure
    card.style.pointerEvents='none'; //on empeche de cliquer sur la carte
}

function verif()
{
    clic=0; //remet le compteur clic à 0

    //on récupére le nom des deux cartes cliquées
    var nameFirstCard = tabCard[firstChoice.dataset.indexcard];
    var nameSecondCard = tabCard[secondChoice.dataset.indexcard];

    if( nameFirstCard == nameSecondCard) //on teste si les deux nom de cartes sont les mêmes
    {
        paires++; //on ajoute 1 au nombre de paire trouvée
        displayPaires(paires); //on met a jour le nombre de paire

        //on bloque le clic sur les paires trouvée
        firstChoice.style.pointerEvents='none';
        secondChoice.style.pointerEvents='none';

        document.getElementById('error-card').style.display='none' // cache le bandeau error-card
        document.getElementById('good-card').style.display='block'; //affiche le bandeau good-card
        setTimeout(function(){document.getElementById('good-card').style.display='none'}, 3000); //attend 3 secondes avant de retire bandeau good-card

    }
    else {
        firstChoice.classList.remove('card-reverse', 'card-'+nameFirstCard); //on retire les classes de l'image
        firstChoice.style.pointerEvents='auto'; // on remet le clic sur la figure
        secondChoice.classList.remove('card-reverse', 'card-'+nameSecondCard); //on retire les classes de l'image
        secondChoice.style.pointerEvents='auto'; // on remet le clic sur la figure

        document.getElementById('good-card').style.display='none' // cache le bandeau good-card
        document.getElementById('error-card').style.display='block'; //affiche le bandeau error-card
        setTimeout(function(){document.getElementById('error-card').style.display='none'}, 3000); //attend 3 secondes avant de retire bandeau error-card
    }

    if(paires == figureCard.length) // si le nombre de paire vaut la taille du tableau alors on a trouvé toutes les paires
    {
        stopChrono(); //On arrete le chrono
        stopProgressionBar(); //On arrete la barre de progression.
        saveTimeGame(timeInterval); //appel de la fonction qui enregistre le temps de jeu
        alert('Vous avez gagnéééééé !'); //message de victoire

        document.getElementById('restart').style.display='block'; //On affiche le lien restart
    }
}

function displayPaires(nombrePaire)
{
    document.getElementById('nombere-paire').innerHTML = nombrePaire; //Met à jour le nombre de paires
}

function stopGame() //Stoppe le jeu quand le temps est fini
{
    if(Date.parse(timeInterval) >= playingTime*1000) //si le chrono est supérieur à playingTime en milliseconde, on arrête le jeu
    {
        alert("Vous avez perduuuu !");

        stopChrono(); //On arrete le chrono
        stopProgressionBar(); //On arrete la barre de progression
        clearInterval(stopGameIntervalId); //on arrete la vérification

        document.getElementById('restart').style.display='block'; //Affiche le lien restart
    }
}

function saveTimeGame(time)
{
    const data = {dateTime: time}; //Mise en forme de la donnée à envoyer

    const xhr = new XMLHttpRequest(); //Récupére la classe Ajax
    xhr.open('POST', 'index.php?action=postTimeGame'); //défini la méthode et l'adresse de la requête
    xhr.setRequestHeader("Content-Type", "application/json"); //défini le header de la requête
    xhr.send(JSON.stringify(data)); //On envoie la requête avec la donnée
}