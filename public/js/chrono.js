var timeStart=0; //date début du chrono
var timeNow=0; //date actuelle
var timeInterval=0; //intervale
var chronoId =0; //Id du chrono

function initializeChrono()
{
    timeStart=new Date(); //défini la date de début à l'appel de la fonction
}

function chrono(){
    timeNow=new Date(); //récupére la date actuelle
    Interval=timeNow-timeStart; //calcule l'intervalle
    timeInterval=new Date(Interval); //défini l'intervalle au format date
    displayTime(timeInterval); //Affiche le temps
}

function displayTime(time){ //affichage du compteur
    var minutes = time.getMinutes(); //récupére les minutes
    var seconds = time.getSeconds(); //récupére les secondes

    if (minutes<10){
        minutes="0"+minutes; //si minutes inférieure à 10, on ajoute un 0 au début (ex: 9 devient 09)
    }
    if (seconds<10){
        seconds="0"+seconds; //si seconds inférieure à 10, on ajoute un 0 au début (ex: 9 devient 09)
    }

    document.getElementById("chrono").innerHTML=minutes+":"+seconds; //on affiche  le texte à l'emplace d'id chrono
}

function startChrono() //démarre le chrono
{
    chronoId = setInterval('chrono()', 1000); //Appel de la fonction chrono chaque seconde
}

function stopChrono()
{
    clearInterval(chronoId); //On arrête le chrono
}
