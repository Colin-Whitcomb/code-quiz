// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var openingHeaderEl = document.getElementById("welcome-div")
var counterNum = document.getElementById("counter-num")
// var buttonA = document.getElementById("button-a")
// var nextButton = document.getElementById("start-btn")

// I'll need the following work to be done once user chooses answer: 
// nextButton.addEventListener("click", () => {
//     currentQuestionIndex++;
//     sendNextQuestion();
// })

// function to strt game - called by clicking Start
function startGame() {

    // check to see if the function has been called
    console.log("Game has started");

    // hide the Welcome to the Code Quiz 
    // display none takes out the empty space 
    openingHeaderEl.style.display = "none";

    // hide the start button
    startButtonEl.classList.add("hide");

    // shows the count down #
    counterNum.classList.remove("hide");

    // show the question element
    questionContainerEl.classList.remove("hide");

    // call the sendNextQuestion function
    // shuffleArr();
    sendNextQuestion();
    setTimeout(fillInLater, 1000 *2)
    shuffleArr(questionArr);

}

// // function to shuffle questionsArr 
function shuffleArr(shuffledArr) {
    console.log("Shuffled Arr was triggered");
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return 
}
//points to shuffled array setting 

// sequences through next questions
function sendNextQuestion() {
    // checking
    console.log("Sent next question");
    // call the showQuestion function
    // showQuestion(questionsArr);
    // shuffleArr(questionArr);
}




// function that shows hidden questions and corresponding answers
function showQuestion(shuffledArr) {
    // writes the question line 
    questionEl.innerText = questionsArr;
    // for every answer on the question array...
    questionArr.answers.forEach(answer => {
        // creates button element
        var button = document.createElement("button");
        // writes the answer text 
        button.innerText = answer.text;
        // turns answers into buttons
        button.classList.add("btn");

        // checking to see if answer is correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // listens for user to click the start button
        // begins the selectAnswer function
        button.addEventListener("click", selectAnswer);
        // appends button into answer buttons elements
        answerButtonsEl.appendChild(button);
    })

}

//  function once answer is selected
function selectAnswer(event) {
    // checking when selectAnswer starts
    console.log("Answer has been selected");
    // setting variable for which button is clicked
    var selectedButton = event.target;
    // determines whether or not the selected button is correct
    var correct = selectedButton.dataset.correct;
    // call the setStatusClass 
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        currentQuestionIndex++;
        sendNextQuestion();
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        console.log("Correct!")
    } else {
        element.classList.add("wrong");
        console.log("Wrong!");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// array of objects of questions 
var questionsArr = [
    {
    question: "What is 4+8?",
    options: ["8", "6", "12", "14", ],
    answer: "12",
},{
    question: "What is 4+4?",
    options: ["8", "4", "44", "14", ],
    answer: "8",
}
]

// Timer function 
var myTimer;
   function fillInLater () {
       console.log("Time has begun");
   }

startButtonEl.addEventListener("click", startGame,)




// All done! 
//     1) Enter Initials
//     2) Submit button

// High Scores: 
//      1) Show IF clicked submit button OR by clicking "View Highschore"
//      2) "View High Score" needs to be visible on screen. 