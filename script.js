/**
 * This script displays the questions and then produces the rubric.
 *
 */


// The domains
var DOMAINS = ["Collaboration", "Knowledge Construction", "Skilled Communication"];

var currentDomain = 0;

// the questions
var QUESTIONS = [
    ["Students are required to work in pairs or groups?", "Students have shared responsibility?", "Students make substantive decisions together?", "Students work is interdependent?"],
    ["Requires knowledge construction?", "Main requirement is knowledge construction?", "Students are required to apply their knowledge in a new context?", "Learning activity is interdisciplinary?"],
    ["Requires extended or multi-modal communication?", "Students must provide supporting evidence?", "Students communicate to a particular audience?"]];

var currentQuestion = -1;

// used during the "Skilled Communication" domain
var flagTerminateDomain = false;

var score = [0, 0, 0];

/* this function shows the rubric */
function showResults() {
    document.getElementById('questions').style.display = 'none';
    document.getElementById('rubric').style.display = 'block';

    document.getElementById('temp').innerHTML = score;
}

/* this function transitions the question to the next domain */
function nextDomain() {
    // set the score for the old domain to the question, plus one because of array interaction
    score[currentDomain] = currentQuestion + 1;
    currentDomain += 1;
    if (currentDomain < DOMAINS.length) {
        document.getElementById("question_heading").innerHTML = "Thinking about " + DOMAINS[currentDomain];
        currentQuestion = -1;
        nextQuestion();
    } else {
        showResults();
    }
}

/* this function runs when the "yes" button is pressed. It advances to the next question */
function nextQuestion() {
    if (flagTerminateDomain) {
        currentQuestion += 1;
        nextDomain();
    } else {
        // increase counter
        currentQuestion += 1;
        // show next question if it exists, otherwise move to next domain
        if (currentQuestion < QUESTIONS[currentDomain].length) {
            document.getElementById("question_line").innerHTML = QUESTIONS[currentDomain][currentQuestion];
        } else {
            nextDomain();
        }
    }
}

/* this function starts the question sequence */
function setupQuestions() {
    currentDomain = 0;
    document.getElementById("question_heading").innerHTML = "Thinking about " + DOMAINS[currentDomain];
    currentQuestion = -1;
    nextQuestion();
}


/* this function runs when the "no" button is pressed. In most cases it advance to the next domain, except for the second question of "Skilled Communication" */
function noPressed() {
    if (DOMAINS[currentDomain] === "Skilled Communication") {
        if (flagTerminateDomain) {
            nextDomain();
        } else if (currentQuestion == 1) {
            flagTerminateDomain = true;
            document.getElementById("question_line").innerHTML = QUESTIONS[currentDomain][currentQuestion + 1];
        } else {
            nextDomain();
        }
    } else {
        // move to next domain
        nextDomain();
    }
}


// append the listeners
document.getElementById("answer_yes").addEventListener("click", nextQuestion, false);
document.getElementById("answer_no").addEventListener("click", noPressed, false);
setupQuestions();
