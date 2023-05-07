document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('settings-btn').addEventListener('click', openSettings);
document.getElementById('save-settings-btn').addEventListener('click', saveSettings);
document.getElementById('start-btn').addEventListener('click', openRules);
document.getElementById('start-game-btn').addEventListener('click', startGame);


let maxNumber = 10;


function openRules() {
    document.getElementById('rules-modal').style.display = 'block';
  }
  
  function startGame() {
    document.getElementById('rules-modal').style.display = 'none';
    document.getElementById('welcome').style.display = 'none'; // Add this line
    document.getElementById('game').style.display = 'block';
    generateExpression();
}

function submitAnswer() {
    let userAnswer = document.getElementById('answer').value;
    let num1 = parseInt(document.getElementById('num1').textContent);
    let num2 = parseInt(document.getElementById('num2').textContent);
    let operator = document.getElementById('operator').textContent;
    let correctAnswer = eval(`${num1} ${operator} ${num2}`);


    let resultMessage = document.getElementById('result-message');

    if (userAnswer == correctAnswer) {
        resultMessage.textContent = 'Correct!';
        resultMessage.style.color = 'green';
        generateExpression();
        document.getElementById('answer').value = '';
    } else {
        resultMessage.innerHTML = 'Incorrect! <br> Try Again';
        resultMessage.style.color = 'red';
        //document.getElementById('try-again-btn').addEventListener('click', tryAgain);
    }
}

function tryAgain() {
    document.getElementById('result-message').textContent = '';
    document.getElementById('answer').value = '';
}


function openSettings() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
    document.getElementById('max-number').value = maxNumber;
}

function saveSettings() {
    maxNumber = parseInt(document.getElementById('max-number').value);
    document.getElementById('settings').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

// Update the generateExpression function
function generateExpression() {
    let num1 = Math.floor(Math.random() * maxNumber) + 1;
    let num2 = Math.floor(Math.random() * maxNumber) + 1;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

    // Ensure division results in an integer
    if (operator === '/') {
        while (num1 % num2 !== 0) {
            num1 = Math.floor(Math.random() * maxNumber) + 1;
            num2 = Math.floor(Math.random() * maxNumber) + 1;
        }
    }

    document.getElementById('num1').textContent = num1;
    document.getElementById('operator').textContent = operator;
    document.getElementById('num2').textContent = num2;
}

// Get the modal and close button
let rulesModal = document.getElementById("rules-modal");
let closeButton = document.getElementsByClassName("close")[0];

// When the user clicks on the close button, close the modal
closeButton.onclick = function() {
    rulesModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}