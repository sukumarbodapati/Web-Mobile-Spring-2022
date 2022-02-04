// set the intial scores
let PlayerA = 0;
let PlayerB = 0;
let result="Start"

// main function 
function game(clickvalue) {
   
    var Random = Rgen();
    comp(clickvalue, Random);
    scorecard();
}

// Random genertor 
function Rgen() {
    var hv = 4, lv = 1;
    return Math.floor(Math.random() * (hv - lv) + lv)
}

// display the scores
function scorecard() {
    document.getElementById("PlayA").innerText=PlayerA ;
    document.getElementById("PlayB").innerText=PlayerB;
    document.getElementById("resulttext").innerText = result;

}
// comparing the players
function comp(a, b) {

    if (a == b) {
        result="Draw"
         return;
    }
    else if ((a == 1 && b == 3) || (a == 2 && b == 1) || (a == 3 && b == 2)) 
    {
        PlayerA += 1;
        
        if (PlayerA == 10) {
            result = "Player A is the winner"
            closegame();
        }
        else {
            result = "Player A win"
            return;
        }

    }
    else {
        PlayerB+=1;
        
        if (PlayerB == 10) {
            result = "Player B is the winner"
            closegame();
        }
        else {
            result = "Player A lost"
            return;
        }
    }

}

// close the game after any player scores 10
function closegame()
{   
    
    var startgame = document.getElementById('Startgame');
    startgame.remove();	
    document.getElementById("closegame").style.display = "block";
    scorecard();
    
}