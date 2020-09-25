var maxBar = 0; //valeur maximale de la barre de progression
var currentBar = 0; //valeur actuelle de la barre de progression
var progressBar; //récupérera la barre de progression
var intervalIdProgressionBar;

function initializeProgressionBar(valueMaxBar)
{
    maxBar = valueMaxBar; //on intialise la valeur maxBar

    progressBar = document.getElementById('progressBar'); //récupére la barre de progression
    progressBar.value=currentBar; //définition de la valeur actuelle
    progressBar.max=maxBar; //définition de la valeur maximale
}

function startProgressBar(timeInterval) //on active la barre progression
{
    intervalIdProgressionBar = setInterval('displayProgressBar()', timeInterval); //on active la barre progression et on défini l'intervalle de répétition
}

function stopProgressionBar() //on arrête la bare de progression
{
    clearInterval(intervalIdProgressionBar);
}

function displayProgressBar()
{
    currentBar++; //ajoute 1 à la barre de progression

    if(currentBar>maxBar) //si la valeur maximale est dépassé, on arrête la progression
    {
        stopProgressionBar();
    }

    progressBar.value = currentBar; //on défini la valeur actuelle
}