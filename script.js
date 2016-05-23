/**
 * This script displays the questions and then produces the rubric.
 *
 */


// The domains
var DOMAINS = ["Collaboration", "Knowledge Construction"];

var currentDomain = 0;

// the questions
var QUESTIONS = [
    ["Students are required to work in pairs or groups?", "Students have shared responsibility?", "Students make substantive decisions together?", "Students work is interdependent?"],
    ["Requires knowledge construction?", "Main requirement is knowledge construction?", "Students are required to apply their knowledge in a new context?", "Learning activity is interdisciplinary?"]];

var currentQuestion = -1;

var score = [0, 0];

/* this function transitions the question to the next domain */
function nextDomain() {
    // set the score for the old domain to the question
    score[currentDomain] = currentQuestion;
    currentDomain++;
    if (currentDomain < DOMAINS.length) {
        document.getElementById("question_heading").innerHTML = "Thinking about " + DOMAINS[currentDomain];
        currentQuestion = -1;
        nextQuestion();
    } else {
        // questions over
    }
}

/* this function runs when the "yes" button is pressed. It advances to the next question */
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < QUESTIONS[currentDomain].length) {
        document.getElementById("question_line").innerHTML = QUESTIONS[currentDomain][currentQuestion];
    } else {
        nextDomain();
    }
    
}


// append the listeners
document.getElementById("answer_yes").addEventListener("click",nextQuestion,false);