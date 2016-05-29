/**
 * This script displays the questions and then produces the rubric.
 *
 */

// The domains
var DOMAINS = ["Collaboration", "Knowledge Construction", "Real-World Problem-Sovling and Innovation", "Use of ICT for Learning", "Self-Regulation", "Skilled Communication"];

// the questions
var QUESTIONS = [
    // collaboration
    ["Students are required to work in pairs or groups?", "Students have shared responsibility?", "Students make substantive decisions together?", "Students work is interdependent?"],
    // knowledge construction
    ["Requires knowledge construction?", "Main requirement is knowledge construction?", "Students are required to apply their knowledge in a new context?", "Learning activity is interdisciplinary?"],
    // real-world problem solving and innovation
    ["Main requirement is problem-solving?", "Are students working on a real-word problem?", "Requires innovation?"],
    // use of ICT for learning
    ["Students have the opportunity to use ICT?", "ICT supports students' knowledge construction?", "ICT is required for constructing this knowledge?", "Students are designers of an ICT product?"],
    // self-regulation
    ["Long-term activity AND students have learning goals and success criteria in advance?", "Students plan their own work?", "Students have opportunity to revise work based on feedback?"],
    // skilled communication
    ["Requires extended or multi-modal communication?", "Students must provide supporting evidence?", "Students communicate to a particular audience?"]
];

// longer explanations to go with the questions
var EXPLANATIONS = [
    // collaboration
    ["Students work together when the activity requires them to work in pairs or groups to discuss an issue, solve a problem and/or create a product.", "Students have shared responsibility when they work in pairs or groups to develop a common product, design, or response. Shared responsibility is more than simply helping each other: students must collectively own the work and be mutually responsible for its outcome.", "Students make substantive decisions together when they must resolve important issues that will guide their work together. Substantive decisions are decisions that shape the content, process, or product of students’ work.", "Students’ work is interdependent when all students must participate in order for the team to succeed. The strongest learning activities on this rubric are structured to require the participation of all students. To meet this criterion, students must be required to produce an interdependent product (such as a presentation that they each must share in developing and presenting) or other interdependent outcome (such as a decision that requires information that is distributed across students)."],
    // knowledge construction
    ["Knowledge construction happens when students do more than reproduce what they have learned: they go beyond knowledge reproduction to generate ideas and understandings that are new to them. The skills of knowledge construction are often considered “critical thinking.” Activities that require knowledge construction ask students to interpret, analyse, synthesize, or evaluate information or ideas.", "The main requirement is the part of the activity that students spend the most time and effort on and the part that educators focus on when grading.", "Students must apply their knowledge when they use the knowledge they have constructed to support another knowledge construction task in a new context. It is not enough for the two contexts to differ only in surface features. Students must use interpretation, analysis, synthesis, or evaluation to decide how to use what they have learned in this new context.", "Interdisciplinary learning activities have learning goals that involve content, important ideas, or methods from different academic subjects. ICT and subjects that are typically taught together do not count as interdisciplinary."],
    // real-world problem solving and innovation
    ["Problem-solving involves a task with a defined challenge for the student. It happens when students must develop a solution to a problem that is new to them, complete a task that they have not been instructed how to do, or design a complex product that meets a set of requirements.", "Real-world problems are authentic situations and needs that exist outside an academic context. Real world problems are experienced by real people, have solutions for a specific, plausible audience, have specific, explicit contexts and, where approrpriate, use actual data.", "Innovation requires putting students’ ideas or solutions into practice in the real world with benefits to people other than the student. In cases where students do not have the authority to implement their own ideas, it is innovation only if students convey their ideas to people outside the classroom context who can implement them."],
    // use of ICT for learning
    ["Student use of ICT happens when students use ICT directly to complete all or part of the learning activity.", "Knowledge construction occurs when students generate ideas and understandings that are new to them, through interpretation, analysis, synthesis, or evaluation.", "ICT is required for the knowledge construction when it allows students to do knowledge construction activities that would be impossible or impractical without the use of the ICT.", "Students are designers of ICT products when they create ICT products that others can use. Students must have an authentic audience in mind and attend to the needs and preferences of that audience."],
    // self-regulation
    ["A learning activity is considered long-term if students work on it for a substantive period of time.<br>Learning goals define what is to be learned in this activity and how these goals fit with prior and future learning.<br>Success criteria are the factors that will be considered to determine whether the learning goals have been met: the evidence of student progress and success in this learning activity.<br>When students have learning goals and associated success criteria in advance of completing their work, it is possible for them to examine the progress and quality of their own work as they do it.", "When students plan their own work, they make decisions about the schedule and steps they will follow to accomplish the task.", "Students have the opportunity to revise their work based on feedback when feedback is given and explicitly used to improve the work before it is submitted or finalized. Feedback may come from the educator or from peers. Students might also have the opportunity to revise their work based on their own deliberate process of self-reflection."],
    // skilled communication
    ["Extended communication is required when student must produce communication that represents a set of connected ideas, not a single simple thought.<br>Communication is multi-modal when it includes more than one type of communication mode or tool used to communicate a coherent message.", "Communication requires supporting evidence when students must explain their ideas or support their thesis with facts or examples.", "Students are required to design their communication for a particular audience when they must ensure that their communication is appropriate to the specific readers, listeners, viewers, or others with whom they are communicating. Students must select the tools, content, or style that they use to reach the audience. It is ideal, but not essential, if the communication will actually be seen by that audience. The requirement is that the students must develop their communication with that audience in mind."]
];

// statements for the rubric
var STATEMENTS = [
    // collaboration
    ["Students are not required to work together in pairs or groups.", "Students do work together, but they do not have shared responsibility.", "Students do have shared responsibility, but they are not required to make substantive decisions together.", "Students do have shared responsibility and they do make substantive decisions together about the content, process, or product of their work; but their work is not interdependent.", "Students do have shared responsibility, they do make substantive decisions together about the content, process, or product of their work and their work is interdependent."],
    // knowledge construction
    ["The learning activity does not require students to construct knowledge. Students can complete the activity by reproducing information or by using familiar procedures.", "The learning activity does require students to construct knowledge by interpreting, analysing, synthesizing, or evaluating information or ideas, but the activity’s main requirement is not knowledge construction.", "The learning activity’s main requirement is knowledge construction, but the learning activity does not require students to apply their knowledge in a new context.", "The learning activity’s main requirement is knowledge construction and the learning activity does require students to apply their knowledge in a new context; but the learning activity does not have learning goals in more than one subject.", "The learning activity’s main requirement is knowledge construction and the learning activity does require students to apply their knowledge in a new context and the knowledge construction is interdisciplinary. The activity does have learning goals in more than one subject."],
    // real-world problem solving and innovation
    ["The learning activity’s main requirement is not problem-solving. Students use a previously learned answer or procedure for most of the work.", "The learning activity’s main requirement is problem-solving, but the problem is not a real-world problem.", "The learning activity’s main requirement is problem-solving and the problem is a real-world problem, but students do not innovate. They are not required to implement their ideas in the real world, or to communicate their ideas to someone outside the academic context who can implement them.", "The learning activity’s main requirement is problem-solving, the problem is a real-world problem and students do innovate. They are required to implement their ideas in the real world, or to communicate their ideas to someone outside the academic context who can implement them."],
    // use of ICT for learning
    ["Students do not have the opportunity to use ICT for this learning activity.", "Students use ICT to learn or practice basic skills or reproduce information, but they are not constructing knowledge.", "Students use ICT to support knowledge construction, but they could construct the same knowledge without using ICT.", "Students the use of ICT is required for knowledge construction, but they do not create an ICT product for authentic users.", "Students the use of ICT is required for knowledge construction and they create an ICT product for authentic users."],
    // self-regulation
    ["Pre-requisites for self-regulation are not in place. The learning activity is not long-term or students do not have both learning goals and associated success criteria in advance of completing their work.", "The learning activity is long-term and students have the learning goals and associated success criteria in advance of completing their work; but students do not have the opportunity to plan their own work.", "The learning activity is long-term, students have learning goals and associated success criteria in advance of completing their work and they have the opportunity to plan their own work. However, students do not have the opportunity to revise their work based on feedback.", "The learning activity is long-term, students have learning goals and associated success criteria in advance of completing their work, they have the opportunity to plan their own work and revise their work based on feedback."],
    // skilled communication
    ["Students are not required to produce extended or multi-modal communication.", "Students are required to produce extended communication or multi-modal communication, but they are not required to provide supporting evidence or design their work for a particular audience.", "Students are required to produce extended communication or multi-modal communication and they are required to provide supporting evidence: they must explain their ideas or support a thesis with facts or examples.", "Students are required to produce extended communication or multi-modal communication, they are required to provide supporting evidence and they are required to design their communication for a particular audience."]
];

var STATEMENT_SKILLED_COM_ALT = "Students are required to produce extended communication or multi-modal communication and they are required to design their communication for a particular audience.";

// tracking variables
var currentDomain = 0;
var currentQuestion = -1;

// used during the "Skilled Communication" domain
var flagTerminateDomain = false;

// user's score
var score = [0, 0, 0, 0, 0, 0];

// the page elements to alter
var questionHeading, questionLine, questionExplanation;

/* this function shows the rubric */
function showResults() {
    // variables
    var table, tBody, row, cellDomain, cellRank, cellExplain, i;
    // change the div on display
    document.getElementById('questions').style.display = 'none';
    document.getElementById('rubric').style.display = 'block';

    // get the table
    table = document.getElementById('table');
    // create the <tbody>
    tBody = document.createElement("tbody");

    // create the cells
    for (i = 0; i < DOMAINS.length; i++) {
        // the row
        row = document.createElement("tr");
        // domain cell
        cellDomain = document.createElement("td");
        cellDomain.appendChild(document.createTextNode(DOMAINS[i]));
        row.appendChild(cellDomain);
        // rank cell
        cellRank = document.createElement("td");
        cellRank.className = "rank";
        cellRank.appendChild(document.createTextNode((score[i] + 1) + "/" + (QUESTIONS[i].length + 1)));
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
        // add the row to the table
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
        questionHeading.innerHTML = DOMAINS[currentDomain];
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
            questionLine.innerHTML = QUESTIONS[currentDomain][currentQuestion];
            questionExplanation.innerHTML = EXPLANATIONS[currentDomain][currentQuestion];
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
    // get the page elements
    questionHeading = document.getElementById("question_heading");
    questionLine = document.getElementById("question_line");
    questionExplanation = document.getElementById("question_explanation");
    // set and display the current domain
    currentDomain = 0;
    questionHeading.innerHTML = DOMAINS[currentDomain];
    // set the flag
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
        questionLine.innerHTML = QUESTIONS[currentDomain][currentQuestion + 1];
        questionExplanation.innerHTML = EXPLANATIONS[currentDomain][currentQuestion + 1];
    } else {
        // move to next domain
        nextDomain();
    }
}


// append the listeners
document.getElementById("begin").addEventListener("click", setupQuestions, false);
document.getElementById("answer_yes").addEventListener("click", nextQuestion, false);
document.getElementById("answer_no").addEventListener("click", noPressed, false);

/* Testing code
score = [2, 2, 2, 2, 2, 2];
showResults();
document.getElementById('questions').style.display = 'block';
*/
