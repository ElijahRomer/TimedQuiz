console.log('if this is logged, app.js is linked correctly');

//VARIABLES

    //can change these variables depending on quiz format.
let totalNumberOfQuestions = 6; //must also add additional questions to the HTML.
let quizDurationAtStart = 100; //in seconds
let quizTimerLoopDelayInterval = 1000; //default 1000 in milliseconds, sets delay for each timer tick

    //Do not change the below variables
let questionNumber ='0';
let buttonSelector;
let currentAnswerButtonsShown;
let timer = document.querySelector('#timeLeftDisplay');
let timeLeftHtmlElement = document.querySelector('#timeLeft');
let timeLeft = quizDurationAtStart;
let countDown;
let startQuizButton = document.querySelector('#quizStart');
let restartQuizButton = document.querySelector('#restartQuiz');
let currentScoreDisplay = document.querySelector('#currentScoreDisplay');
let restartQuizValue = false;
let answerCheckHtmlElement = document.querySelector('#answerCheck');
//let currentQuestionDisplay = document.querySelector(`#question${questionNumber}`);//breaks code?
let currentScore = 0;
let mostRecentScore;
let mostRecentScoreDisplay = document.querySelector('#mostRecentScoreDisplay');
//let answerCheckTextDisplay = document.querySelector('#answerCheck').innerHTML;

//EVENT LISTENERS (answer buttons are within for loop in quizProgress.)
startQuizButton.addEventListener('click', startQuiz);
restartQuizButton.addEventListener('click', restartQuiz);

//FUNCTIONS
function startQuiz(){
  console.log('STARTQUIZ FIRED');
  timer.style.display = 'block';
  restartQuizButton.style.display = 'block';
  currentScoreDisplay.style.display = 'block';
  answerCheckHtmlElement.style.display = 'block';
  quizTimer();
  quizProgress();
  console.log('STARTQUIZ FINISHED');
};

function restartQuiz(){
  console.log('RESTARTQUIZ FIRED')
   restartQuizValue = true;
  console.log(`restartQuizValue is now ${restartQuizValue}. Firing quizTimer.`);
  quizTimer();
};

function quizTimer(){
  console.log('QUIZTIMER FIRED');
  console.log(timeLeftHtmlElement);
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
    timeLeft -= 1;
    timeLeftHtmlElement.innerHTML = timeLeft;
    return timeLeft;
  }, quizTimerLoopDelayInterval);
}else if(restartQuizValue === true){
  clearInterval(countDown);
  console.log(`quizTimer recognizes restartQuizValue as ${restartQuizValue}. Firing quizEnd.`);
  quizEnd();
}};

function advanceQuestionNumber() {
  console.log(`ADVANCEQUESTIONNUMBER FIRED`)
  questionNumber = parseInt(questionNumber);
  questionNumber += 1;
  questionNumber = questionNumber.toString();
    console.log(`The questionNumber has been updated by advanceQuestionNumber to ${questionNumber}`);
  return questionNumber;
};

function quizProgress(){
  console.log('QUIZPROGRESS FIRED');
  if(timeLeft > 0){
    document.querySelector(`#question${questionNumber}`).style.display = 'none';
    advanceQuestionNumber();
    console.log(`The question number at quizProgress has been updated to ${questionNumber}`);
    if (questionNumber <= totalNumberOfQuestions){
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
      buttonSelector = `.answerChoiceQ${questionNumber}`;
      console.log(`The buttonSelector at quizProgress is ${buttonSelector}`);
      currentAnswerButtonsShown = document.querySelectorAll(buttonSelector);
      console.log(`The question number at quizProgress is ${questionNumber}`);
      for (i = 0; i < currentAnswerButtonsShown.length; i++){
        currentAnswerButtonsShown[i].addEventListener("click", quizProgress);
        currentAnswerButtonsShown[i].addEventListener("click", answerCheck);
      };}
    return questionNumber;
  } else {
  console.log(`quizProgress recognized the current question number "${questionNumber}" is greater than number of questions. Firing quizEnd`);
  quizEnd()
  }
};

function answerCheck(eventObject){
  console.log(`ANSWERCHECK FIRED`);
    if(eventObject.target.id === "correct"){
      currentScore += 1;
      document.querySelector('#answerCheck').innerHTML = 'Your answer was CORRECT! +1 point.';
    } else if(eventObject.target.id === "incorrect"){
      document.querySelector('#answerCheck').innerHTML = 'Your answer was INCORRECT! 0 points.';
    };
  document.querySelector('#currentScore').innerHTML = currentScore;
};

function quizEnd(){
  console.log('QUIZEND FIRED');
  console.log(`The questionNumber at quizEnd is ${questionNumber}`);
  console.log(`The timeLeft at quizEnd is ${timeLeft}`);
  console.log(`The currentScore at quizEnd is ${currentScore}`);

  mostRecentScore = currentScore;
  currentScore = 0;
  timer.style.display = 'none';
  restartQuizButton.style.display = 'none';
  currentScoreDisplay.style.display = 'none';
  answerCheckHtmlElement.style.display = 'none';
  mostRecentScoreDisplay.style.display = 'block';
  document.querySelector('#mostRecentScore').innerHTML = mostRecentScore;
  document.querySelector('#currentScore').innerHTML = currentScore;
  timeLeftHtmlElement.innerHTML = 100;
  if(timeLeft <= 0){ 
      console.log(`The question number at quizEnd timeout path is ${questionNumber}`);
      timeLeft = quizDurationAtStart;
      document.querySelector(`#question${questionNumber}`).style.display = 'none';
      questionNumber = 0;
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
  } else if (questionNumber >= totalNumberOfQuestions){
      console.log(`The question number at quizEnd last question path is ${questionNumber}`);
      timeLeft = quizDurationAtStart;
      questionNumber = 0;
      document.querySelector(`#question${questionNumber}`).style.display = 'block';
  } else if (restartQuizValue === true){
      console.log(`The restartQuizValue at quizEnd restartQuiz path is ${restartQuizValue}`);
      timeLeft = quizDurationAtStart;
      restartQuizValue = false;
      document.querySelector(`#question${questionNumber}`).style.display = 'none';
      questionNumber = 0;
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

