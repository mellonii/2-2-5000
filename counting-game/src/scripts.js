document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('settings-btn').addEventListener('click', openSettings);
document.getElementById('save-settings-btn').addEventListener('click', saveSettings);
document.getElementById('start-btn').addEventListener('click', openRules);
document.getElementById('start-game-btn').addEventListener('click', startGame);


let maxNumber = 10;
let dep = 1


function openRules() {
    document.getElementById('rules-modal').style.display = 'block';
  }
  
  function startGame() {
    document.getElementById('result-message').textContent = '';
    document.getElementById('rules-modal').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    generateExpression();
}

function submitAnswer() {
    let userAnswer = document.getElementById('answer').value;
    let operator = document.getElementById('expression').textContent;
    let correctAnswer = eval(operator);


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
    document.getElementById('depth').value = dep;
}

function saveSettings() {
    maxNumber = parseInt(document.getElementById('max-number').value);
    dep = parseInt(document.getElementById('depth').value);
    let settingsError = document.getElementById('settings-error');
    if (isNaN(maxNumber) || isNaN(dep) || dep > 4 || maxNumber > 999 || dep<1 || maxNumber<=0) {
        settingsError.textContent = "За гранью твоих возмоностей!";
        settingsError.style.display = "block";
        return;
    } else {
        settingsError.textContent = "";
        settingsError.style.display = "none";
    }

    document.getElementById('settings').style.display = 'none';
    startGame();
    document.getElementById('game').style.display = 'block';
}

function generateValidExpression(depth) {
    let num1, num2;
  
    if (depth == 1) {
      num1 = Math.floor(Math.random() * maxNumber) + 1;
      num2 = Math.floor(Math.random() * maxNumber) + 1;
    } else {
      num1 = generateValidExpression(depth - 1);
      num2 = generateValidExpression(depth - 1);
    }
  
    let operators = ["+", "-", "*"];
    let operator = operators[Math.floor(Math.random() * operators.length)];
  
    return [num1, operator, num2];
  }

  function parseExpression(components, depth) {
    if (depth === 1) {
      return "("+components.join(" ")+")";
    } else {
      let num1Sub = parseExpression(components[0], depth - 1);
      let num2Sub = parseExpression(components[2], depth - 1);
      let oper = components[1];
      return `(${num1Sub} ${oper} ${num2Sub})`;
    }
  }

  function generateExpression() {
    let expression = generateValidExpression(dep);
    expression = parseExpression(expression,dep);
    //console.log(expression);
  
    document.getElementById("expression").textContent = expression.substring(1, expression.length - 1);
    //document.getElementById("num1").textContent = num1;
    //document.getElementById("operator").textContent = operator;
    //document.getElementById("num2").textContent = num2;
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