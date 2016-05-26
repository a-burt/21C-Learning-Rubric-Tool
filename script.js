/**
 * This script displays the questions and then produces the rubric.
 *
 */


// The domains
var DOMAINS = ["Collaboration", "Knowledge Construction", "Skilled Communication"];

var currentDomain = 0;

// the questions
var QUESTIONS = [
    // colaboration
    ["Students are required to work in pairs or groups?", "Students have shared responsibility?", "Students make substantive decisions together?", "Students work is interdependent?"],
    // knowledge construction
    ["Requires knowledge construction?", "Main requirement is knowledge construction?", "Students are required to apply their knowledge in a new context?", "Learning activity is interdisciplinary?"],
    // skilled communication
    ["Requires extended or multi-modal communication?", "Students must provide supporting evidence?", "Students communicate to a particular audience?"]
];

// statements for the rubric
var STATEMENTS = [
    // collaboration
    ["Students are not required to work together in pairs or groups.", "Students do work together, but they do not have shared responsibility.", "Students do have shared responsibility, but they are not required to make substantive decisions together.", "Students do have shared responsibility and they do make substantive decisions together about the content, process, or product of their work; but their work is not interdependent.", "Students do have shared responsibility, they do make substantive decisions together about the content, process, or product of their work and their work is interdependent."],
    // knowledge construction
    ["The learning activity does not require students to construct knowledge. Students can complete the activity by reproducing information or by using familiar procedures.", "The learning activity does require students to construct knowledge by interpreting, analysing, synthesizing, or evaluating information or ideas, but the activity’s main requirement is not knowledge construction.", "The learning activity’s main requirement is knowledge construction, but the learning activity does not require students to apply their knowledge in a new context.", "The learning activity’s main requirement is knowledge construction and the learning activity does require students to apply their knowledge in a new context; but the learning activity does not have learning goals in more than one subject.", "The learning activity’s main requirement is knowledge construction and the learning activity does require students to apply their knowledge in a new context and the knowledge construction is interdisciplinary. The activity does have learning goals in more than one subject."],
    // skilled communication
    ["Students are not required to produce extended or multi-modal communication.", "Students are required to produce extended communication or multi-modal communication, but they are not required to provide supporting evidence or design their work for a particular audience.", "Students are required to produce extended communication or multi-modal communication and they are required to provide supporting evidence: they must explain their ideas or support a thesis with facts or examples.", "Students are required to produce extended communication or multi-modal communication, they are required to provide supporting evidence and they are required to design their communication for a particular audience."]
];

var STATEMENT_SKILLED_COM_ALT = "Students are required to produce extended communication or multi-modal communication and they are required to design their communication for a particular audience.";

var currentQuestion = -1;

// used during the "Skilled Communication" domain
var flagTerminateDomain = false;

var score = [0, 0, 0];

/* this function shows the rubric */
function showResults() {
    // change the div on display
    document.getElementById('questions').style.display = 'none';
    document.getElementById('rubric').style.display = 'block';

    // get the table
    var table = document.getElementById('table');
    // create the <tbody>
    var tBody = document.createElement("tbody");

    // create the cells
    for (var i = 0; i < DOMAINS.length; i++) {
        // the row
        var row = document.createElement("tr");
        // domain cell
        var cellDomain = document.createElement("td");
        cellDomain.appendChild(document.createTextNode(DOMAINS[i]));
        row.appendChild(cellDomain);
        // rank cell
        var cellRank = document.createElement("td");
        cellRank.appendChild(document.createTextNode(score[i] + 1));
        row.appendChild(cellRank);
        // explanation cell
        var cellExplain = document.createElement("td");
        if (flagTerminateDomain && score[i] == 2) {
            // "Skill Communication" special text
            cellExplain.appendChild(document.createTextNode(STATEMENT_SKILLED_COM_ALT));
        } else {
            // usual text
            cellExplain.appendChild(document.createTextNode(STATEMENTS[i][score[i]]));
        }
        row.appendChild(cellExplain);
        tBody.appendChild(row);
    }
    table.appendChild(tBody);
}

/* this function transitions the question to the next domain */
function nextDomain() {
    // set the score for the old domain to the question they were up to
    score[currentDomain] = currentQuestion;
    currentDomain += 1;
    // display the next domain if it is available
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
    // check to see if it is currently in the "Skilled Communication" special case.
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
    // swap the div on display
    document.getElementById("introduction").style.display = "none";
    document.getElementById("questions").style.display = "block";
    // set current domain
    currentDomain = 0;
    document.getElementById("question_heading").innerHTML = "Thinking about " + DOMAINS[currentDomain];
    flagTerminateDomain = false;
    // display the first question
    currentQuestion = -1;
    nextQuestion();
}


/* This function runs when the "no" button is pressed.
 * In most cases it advance to the next domain, with two exceptions.
 * If no is selected for the second question of "Skilled Communication", the third questions is displayed. So a flag is set.
 * If no is selected after the third questions, they are given a score of 2. If yes is given, they are given a score of 3.
 */
function noPressed() {
    // check if the flag has already been set
    if (flagTerminateDomain) {
        nextDomain();
        // then check if question 2 of "Skilled Communication" is displayed.
    } else if (DOMAINS[currentDomain] === "Skilled Communication" && currentQuestion === 1) {
        flagTerminateDomain = true;
        document.getElementById("question_line").innerHTML = QUESTIONS[currentDomain][currentQuestion + 1];
    } else {
        // move to next domain
        nextDomain();
    }
}


// append the listeners
document.getElementById("begin").addEventListener("click", setupQuestions, false);
document.getElementById("answer_yes").addEventListener("click", nextQuestion, false);
document.getElementById("answer_no").addEventListener("click", noPressed, false);
