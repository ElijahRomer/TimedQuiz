console.log('if this is logged, app.js is linked correctly');

//Variables
var questionNumber ='0';
let buttonSelector;
let allButtonsOnPage;
let eventListener;
let timeLeftDisplay = document.getElementById('timeLeftDisplay');
let timeLeft = 75;
let countDown;

//Start Quiz
document.querySelector('#quizStart').addEventListener('click', startQuiz);

//Functions

function startQuiz(){
  startTimer();
  quizProgress();
}

function startTimer(){
  console.log('Start Quiz Click Registered, startTimer fired');
  countDown= setInterval(function(){
    if(timeLeft <= 0){
      clearInterval(countDown);
      quizEnd();
    }
    timeLeftDisplay.innerHTML = timeLeft;
    timeLeft -= 1;
  } ,100)
};

function advanceQuestionNumber() {
  //advance questionNumber by 1
  questionNumber = parseInt(questionNumber);
  questionNumber += 1;
  questionNumber = `${questionNumber}`;
  console.log(questionNumber);
    //update variable memory locations at global scope
    console.log(buttonSelector);
    console.log(allButtonsOnPage);
  return questionNumber, buttonSelector, allButtonsOnPage;
};

function quizProgress(eventObject){
  console.log('Start Quiz Click Registered, quizProgress fired');
  document.querySelector(`#question${questionNumber}`).style.display = 'none';
  advanceQuestionNumber();
  document.querySelector(`#question${questionNumber}`).style.display = 'block';
    buttonSelector = `.answerChoiceQ${questionNumber}`;
    allButtonsOnPage = document.querySelectorAll(buttonSelector);
    for (i = 0; i < allButtonsOnPage.length; i++){
      allButtonsOnPage[i].addEventListener("click", quizProgress);
    };
    return questionNumber;
};

function quizEnd(){
  alert('quizEnd Fired');
  questionNumber = -1;
  quizProgress();
  return questionNumber;
}

// function updateAllButtonsOnPage(){
//   for(i=0; i<allButtonsOnPage.length; i++){
//     allButtonsOnPage[i].addEventListener('click', quizProgress())
//   };
// };


// //Event Listeners to trigger quizProgress()
// document.querySelector('.answerChoiceQ1').addEventListener('click', quizProgress);

// document.querySelector('.answerChoiceQ2').addEventListener('click', quizProgress);

// document.querySelector('.answerChoiceQ3').addEventListener('click', quizProgress);

// document.querySelector('.answerChoiceQ4').addEventListener('click', quizProgress);

// document.querySelector('.answerChoiceQ5').addEventListener('click', quizProgress);

// document.querySelector('.answerChoiceQ6').addEventListener('click', quizProgress);

//Hide current page, reveal the next page.



//JAVASCRIPT ELEMENTS TO CREATE*******************
//make a variable for currentTimeLeft
//make a variable for element currentTimeLeftDisplay
//make a variable for name element user input at beginning of game
//make a variable for score 
//make a variable for concatenated value of score and name called scoreItem
//make a variable for highScores and set it equal to an array

//add event listener to quiz start button
//add event listener to high score submit button

//create function for quizProgress
//create function for timer
//create function for managing css visibility of each HTML Element
//create score submit function

//HTML ELEMENTS TO CREATE***********************
  //quiz landing page
    //most recent score
    //start button
    //view highscore button
  //each quiz question and answers in a div
  //view high score page


//PSEUDOCODE BELOW********************************

//button click for quiz start

  //quizProgress function
      //each question and answer display is contained in a separate HTML <div> with css visibility set to hidden by default
      //each button clicked will hide the current q/a display and reveal the next
        //if correct, "Correct" will be displayed below element, if incorrect, "Incorrect" will be displayed
      //when all questions answered, clearInterval on timeLeft, trigger quiz end function

  //timerCountdown function
      //starts timer ticking backwards, value = timeLeft, dispayed in the innerhtml of currentTimeLeftDisplay
      //if timer reaches 0, trigger quizEnd function
  
  //quiz end function
      //alert game over
      //make visible the following:
        //Top 10 scores
        //enter name input field
        //display name (key) 
        //display score (value)
        //submit score button - triggers score submit function
  
  //SCORE SUBMIT FUNCTION
      // if statement
        //if highScores in local storage does not exist (= null), set equal to an empty array
        //ELSE parse from string to array and set equal to highScores variable
      //take each value for name and score and set as variable "name" and "score"
      //push to highscores array formatted as an object combining the two into a key value pair
      //(highScores.push({[name]: score});)
      //convert highscores back to a string and set = to highScores key in localStorage
      //run view scores function

  //VIEW SCORE FUNCTION
      //set visibility for all other pages to hidden
      //set visibility for high score page to visible, position absolute
      //access local storage and convert highScores string into an array
      //create for loop to parse through array and append each index into an Li
      //append each li into the ul on the highscores page.

