let Body = document.querySelector("body");
let body = document.querySelector(".body");
let questionDiv = document.querySelector(".questionDiv");
let que = document.querySelector(".que");
let quetxt = document.querySelector(".quetxt");
let scoreMsg = document.querySelector(".scoreMsg");

let answerDiv = document.querySelector(".answerDiv");
let answerIn = document.querySelector(".answerInput");
let saveBtn = document.querySelector(".saveBtn");


let startBtn = document.querySelector(".startBtn");
let restartBtn = document.querySelector(".restartBtn");

let started = false;
let points;
let pointsArr = [0];
let counter = 0;
let totalScore = 0;

let startTime;
let intervalId;
let nextStart = false;

let randomQue = 0;


//start on enter for keyboard attached devices
document.addEventListener("keypress",()=>{
    started = true;
    points = 0;
    Body.classList.remove("red");
    if(started === true && nextStart === false){
        startBtn.classList.add("hide");
        setTimeout(next,500);
        nextStart = true;
    }
});


//start on startBtn click for moblies and any other android devices 
startBtn.addEventListener("click",()=>{
    started = true;
    points = 0;
    Body.classList.remove("red");
    if(started === true && nextStart === false){
        startBtn.classList.add("hide");
        answerIn.focus();
        setTimeout(next,500);
        nextStart = true;             
    }
});


//next func
function next(){
    let numbers = randomNumbers();
    quetxt.innerHTML = numbers.queTxtString;  
    answerIn.value = '';
    answerIn.focus();

    // sumerrr();
    startTime = Date.now();
    intervalId = setInterval(gameOver,10000);
    totalScore = pointsArr.reduce((acc, curr)=> acc+curr,0);
    scoreMsg.textContent = `score: ${totalScore}`;
}


//answerCheck   
saveBtn.addEventListener("click",()=>{
    if(started === true){
        if(answerIn.value != ''){
            if(isCorrect()){
                points = Math.round((getRemainingTime() / 100));
                pointsArr.push(points);
                clearInterval(intervalId);
                setTimeout(next,300);
            } else{
                gameOver(); // complete this function
            }
        }
    }
});


//random numbers
function randomNumbers(){
    let num1 = Math.floor(Math.random()*99);
    let num2 = Math.floor(Math.random()*99);
    randomQue = num1 + num2;
    let queTxtString = num1.toString()+" + "+ num2.toString();

    return {queTxtString,randomQue};
}


//to check if player clicked correct option
function isCorrect(){
    let answerInput = parseInt(answerIn.value);
    return answerInput == randomQue;
}


//gameover function , to handle when the player selects wrong number 
function gameOver(){
    Body.classList.add("red");
    started = false;
    nextStart = false;
    answerIn.blur();
    scoreMsg.textContent = `Game over ,Your score is ${totalScore}`;
    restartBtn.classList.remove("hide");
}


function timer(){
    intervalId = setInterval(gameOver,10000);
    return intervalId;
}


// for nice distribution of score with high accuracy and extra features
function getRemainingTime() {
    if (startTime) {
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        let remainingTime = 10000 - elapsedTime; 
        return remainingTime;
    }
    return 0; // Default to 0 if startTime is not set
}
