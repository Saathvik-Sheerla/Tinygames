let Body = document.querySelector("body");
let body = document.querySelector(".body");
let questionDiv = document.querySelector(".questionDiv");
let que = document.querySelector(".que");
let quetxt = document.querySelector(".quetxt");
let scoreMsg = document.querySelector(".scoreMsg");

let optionDiv = document.querySelector(".optionDiv");
let opt = document.querySelectorAll(".opt");
let opt1 = document.querySelector(".opt1");
let opt2 = document.querySelector(".opt2");
let opttxt = document.querySelectorAll(".opttxt");    
let opt1Id = document.getElementById("opt1");
let opt2Id = document.getElementById("opt2");

let startBtn = document.querySelector(".startBtn");
let restartBtn = document.querySelector(".restartBtn");

let started = false;
let points = 0;
let startTime;
let intervalId;
let nextStart = false;

//start on enter for keyboard attached devices
document.addEventListener("keypress",()=>{
    started = true;
    points = 0;
    Body.classList.remove("red");
    scoreMsg.innerText = "";
    if(started === true && nextStart === false){
        startBtn.classList.add("hide");
        setTimeout(next,100);
        nextStart = true;
    }
});

//start on startBtn click for moblies and any other android devices 
startBtn.addEventListener("click",()=>{
    started = true;
    points = 0;
    Body.classList.remove("red");
    scoreMsg.innerText = "";
    if(started === true && nextStart === false){
        startBtn.classList.add("hide");
        setTimeout(next,100);
        nextStart = true;
    }
});


//next func
function next(){
    let numbers = randomNumbers();
    let options = [numbers.correctAns, numbers.reverseOfQue];
    let randIdx = Math.floor(Math.random()*2);
    let otherIdx = otherIndex(randIdx);
    quetxt.innerHTML = numbers.randomQue;
    opt1Id.innerText = options[randIdx];   
    opt2Id.innerText = options[otherIdx];

    // oneSec();
    startTime = Date.now();
    intervalId = setInterval(gameOver,3100);
    scoreMsg.innerText = `score: ${points}`;
}

//random numbers
function randomNumbers(){
    let randomQue = Math.floor(Math.random()*999)+1;
    let correctAns = randomQue;
    let reverseOfQue = reverseNum(randomQue);

    return {randomQue,correctAns,reverseOfQue};  
}


function reverseNum(num){
    return parseInt(num.toString().split('').reverse().join(''));
}


//btnPress
for(let ele of opt){    
    ele.addEventListener("click",()=>{
        if(started === true){
            if(isCorrect(ele)){
                points += Math.round((getRemainingTime() / 100));
                clearInterval(intervalId);
                setTimeout(next,50);
            } else{
                gameOver(); // complete this function
            }
        }
    });
}


//to check if player clicked correct option
function isCorrect(ele){
    let randomQue = parseInt(quetxt.innerText);
    let selectedOpt = parseInt(ele.innerText);
    return selectedOpt == randomQue;
}


//gameover function , to handle when the player selects wrong number 
function gameOver(){
    Body.classList.add("red");
    started = false;
    nextStart = false;
    scoreMsg.innerText = `Game over ,Your score is ${points}`;
    restartBtn.classList.remove("hide");
}


//otherIdx
function otherIndex(num){
    // if(num == 0){
    //     return 1;
    // } else{
    //     return 0;
    // }

    return num===0?1:0;
}


function oneSec(){
    intervalId = setInterval(gameOver,3100);
    return intervalId;
}


// for nice distribution of score with high accuracy and extra features
function getRemainingTime() {
    if (startTime) {
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        let remainingTime = 3100 - elapsedTime; // Total interval time is 5000ms (5 seconds)
        return remainingTime;
    }
    return 0; // Default to 0 if startTime is not set
}





//give me html  css and js code for "a circular div has a border and it ends in 3 seconds visually using css and js and immediatly after 3 secs the whole document changes to red color and a stop button is also present if the stop button is presed within 3 secs then again the timer should start from 3 secs and agian and agian until the user do not press the stop button in time"