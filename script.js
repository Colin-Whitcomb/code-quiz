// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var openingHeaderEl = document.getElementById("welcome-div")
var counterNum = document.getElementById("counter-num")
var nextButton = document.getElementById("next-btn")
var corrWrongEl = document.getElementById("correct-wrong")
var submitBtn = document.getElementById("submitButton")
var input = document.getElementById("input")
var endGameForm = document.getElementById("endGameForm")
var hsArea = document.getElementById("hsArea")
var hsBtn = document.getElementById("view-highscore")
var reStart = document.getElementById("reStart")
var closeHs = document.getElementById("closeHS")
// ================================================= //  

// global variables 
var questionIndex = 0;
var score;
var correct;
var timerGlobal;
var initials;
var highScores;

// total seconds in game
let time = 25;

//Timer function 
function updateTimer() {
    // let seconds =;
    time--;
    counterNum.innerHTML = time;
    if (time <= 0) {
        endGame();
    }
}


// function to start game - called by clicking Start
function startGame() {
    openingHeaderEl.style.display = "none";
    startButtonEl.classList.add("hide");
    counterNum.classList.remove("hide");
    questionContainerEl.classList.remove("hide");
    questionIndex = 0;
    score = 0;
    timerGlobal = setInterval(updateTimer, 1000);
    showQuestion();

}

// function that shows hidden questions and corresponding answers
function showQuestion() {
    questionEl.textContent = questionsArr[questionIndex].question;
    var answers = questionsArr[questionIndex].options;
    for (var i = 0; i < answers.length; i++) {
        answerButtonsEl.children[i].textContent = answers[i];
        answerButtonsEl.children[i].addEventListener("click", selectAnswer);
    
    }
}

//  function once answer is selected
function selectAnswer(event) {
    var selectedButton = event.target.innerText;
    // determines whether or not the selected button is correct
    var correct = questionsArr[questionIndex].answer;

    if (selectedButton === correct) {
        score += 5; // make sure only one right answer per attempt
        console.log("This is the score" + score);
        corrWrongEl.classList.remove("hide");
        corrWrongEl.children[0].textContent = "Correct!";

    } else {
        corrWrongEl.children[0].textContent = "Wrong!";
        corrWrongEl.classList.remove("hide")
        time -= 3; 
      
    }
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", nextQuestion);
}

function nextQuestion() {
    questionIndex++;
    nextButton.classList.add("hide");
    corrWrongEl.classList.add("hide");
    showQuestion();
    if (questionIndex >= 4) {
        return endGame();
    }    
}

function endGame() {
    console.log("game has ended");
    clearInterval(timerGlobal);
    questionContainerEl.classList.add("hide");
    nextButton.classList.add("hide");
    endGameForm.classList.remove("hide");
    hsArea.classList.remove("hide");
    pushData();
    endGameForm.children[0].textContent = "You got " + score + " point(s)!";

}

//function to push to local storage 
function pushData() {
    printScores();
    console.log("push has begun");
    var initials = input.value.trim();
    //putting score and initials in object
    if (initials !== "") {
        // check to see if there are any saved high scores in localStorage
        
        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        var newScore = {
            score: score,
            initials: initials,
            
        };

        // adding new player in to high score list
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));
        //redirect to where I want to keep high scores. 
        // printScores();
    } 
}

// taking info from local storage and display it 
function printScores() {
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    console.log("Print has been initiated");
    // parse from JSON
    highScores.sort(function (a, b) {
        return b.score - a.score
    });

    // loop through JSON list 
    highScores.forEach(function (score) {
        console.log("for each triggered");
        var player = document.createElement('li');
        player.textContent = score.initials + ' -- ' + score.score;

        var winners = document.getElementById("hsArea"); 
        winners.appendChild(player);
        // showScores();
        hsArea.classList.remove("hide");
    });

function clearScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;
// printScores();
};

function showScores () {
    hsArea.classList.remove('hide');
}
function reStart () {
    window.location.reload();
}

function closeHs() {
    hsArea.classList.add("hide"); 
   
}

// array of questions and their corresponding options and answer. 
let questionsArr = [{
        question: "What is the capital of South Carolina?",
        options: ["Raleigh", "Myrtle Beach", "Charleston", "Columbia", ],
        answer: "Columbia",
    }, {
        question: "What is the capital of California?",
        options: ["Sacramento", "Los Angeles", "San Francisco", "San Diego", ],
        answer: "Sacramento",
    }, {
        question: "What is the capital of New York?",
        options: ["NYC", "Buffalo", "Albany", "Rochester", ],
        answer: "Albany",
    }, {
        question: "What is the capital of Florida?",
        options: ["Tampa", "Orlando", "Miami", "Tallahassee", ],
        answer: "Tallahassee",
    },
    {
        question: "What is the capital of Oregon?",
        options: ["Portland", "Salem", "Oregon City", "Eugene", ],
        answer: "Salem",
    }
]

// closeHs.addEventListener("click", closeHS);
// reStart.addEventListener("click", reStart);
hsBtn.addEventListener("click", showScores);
submitBtn.addEventListener("click", pushData);
startButtonEl.addEventListener("click", startGame);
