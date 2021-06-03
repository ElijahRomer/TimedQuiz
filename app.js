console.log('if this is logged, app.js is linked correctly');

//Variables
let totalNumberOfQuestions = 6;
let questionNumber ='0';
let buttonSelector;
let allButtonsOnPage;
let timeLeftDisplay = document.getElementById('timeLeftDisplay');
let quizDurationAtStart = 75;
let timeLeft = quizDurationAtStart;
let countDown;
let restartQuizButton = document.querySelector('#restartQuiz');
let restartQuizValue = false;

console.log(`restartQuizValue is ${restartQuizValue}`);

//Start Quiz
document.querySelector('#quizStart').addEventListener('click', startQuiz);
//Restart Quiz
//restartQuizButton.addEventListener('click', restartQuiz);
//FUNCTIONS

function startQuiz(){
  console.log('STARTQUIZ FIRED');
  console.log(`restartQuizValue at startQuiz is ${restartQuizValue}`)
  quizTimer();
  quizProgress();
  console.log(`restartQuizValue after startQuiz execution is ${restartQuizValue}`);
};

function restartQuiz(){
  console.log('RESTARTQUIZ FIRED')
   restartQuizValue = true;
  console.log(`restartQuizValue is now ${restartQuizValue}`);
  quizTimer();
};

function quizTimer(){
  console.log('QUIZTIMER FIRED');
  console.log(`restartQuizValue at quizTimer is ${restartQuizValue}`);
  if(restartQuizValue === false){
  countDown= setInterval(function(){
    if(questionNumber > totalNumberOfQuestions){
          clearInterval(countDown);
          console.log('quizTimer recognizes last question answered. Firing quizEnd.');
          quizEnd();
    }else if(timeLeft <= 0){
          clearInterval(countDown);
          console.log('quizTimer recognizes the timer has run out. Firing quizEnd.');
          quizEnd();
    }
    timeLeftDisplay.innerHTML = timeLeft;
    timeLeft -= 1;
    return timeLeft;
  }, 100);
}else if(restartQuizValue === true){
  clearInterval(countDown);
  console.log(`quizTimer recognizes restartQuizValue as ${restartQuizValue}. Firing quizEnd.`);
  quizEnd();
}};

function advanceQuestionNumber() {
  if(questionNumber <=totalNumberOfQuestions /* must = the number of questions*/){
  questionNumber = parseInt(questionNumber);
  questionNumber += 1;
  questionNumber = questionNumber.toString();
    console.log(`The questionNumber has been updated by advanceQuestionNumber to ${questionNumber}`);
  return questionNumber;
  }

  quizEnd();
};

function quizProgress(){
  console.log('QUIZPROGRESS FIRED');
  console.log(`restartQuizValue at quizProgress is ${restartQuizValue}`);
  if(timeLeft > 0){
    document.querySelector(`#question${questionNumber}`).style.display = 'none';
    advanceQuestionNumber();

    console.log(`The question number at quizProgress has been updated to ${questionNumber}`);

    if (questionNumber <= totalNumberOfQuestions){
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
      buttonSelector = `.answerChoiceQ${questionNumber}`;
      console.log(`The buttonSelector at quizProgress is ${buttonSelector}`);
      allButtonsOnPage = document.querySelectorAll(buttonSelector);
      console.log(`The question number at quizProgress is ${questionNumber}`);
      for (i = 0; i < allButtonsOnPage.length; i++){
        allButtonsOnPage[i].addEventListener("click", quizProgress);
      };}
    return questionNumber;
  } else {
  console.log(`The current question number "${questionNumber}" is greater than number of questions. Firing quizEnd`);
  questionNumber = 7;
  quizEnd()
  }
};

//instead of coding a hard timeLeft of 75 in quizEnd for each conditional path, possible to make this a variable that can be easily adjusted to preference at top? look into it
function quizEnd(){
  console.log('QUIZEND FIRED');
  console.log(`The questionNumber at quizEnd is ${questionNumber}`);
  console.log(`The timeLeft at quizEnd is ${timeLeft}`);
  if(timeLeft <= 0){ 
      console.log(`The question number at quizEnd timeout path is ${questionNumber}`);
      document.querySelector(`#question${questionNumber}`).style.display = 'none';
      questionNumber = 0;
      timeLeft = quizDurationAtStart;
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
  } else if (questionNumber >= totalNumberOfQuestions){
      console.log(`The question number at quizEnd last question path is ${questionNumber}`);
      questionNumber = 0;
      timeLeft = quizDurationAtStart;
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
  } else if (restartQuizValue === true){
      console.log(`The restartQuizValue at quizEnd restartQuiz path is ${restartQuizValue}`);
      document.querySelector(`#question${questionNumber}`).style.display = 'none';
      questionNumber = 0;
      timeLeft = quizDurationAtStart;
      restartQuizValue = false;
      console.log(`The restartQuizValue at quizEnd restartQuiz has been updated to ${restartQuizValue}`);
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
  };
};


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

