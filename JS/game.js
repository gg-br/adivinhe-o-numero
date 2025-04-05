let secretSequence = ""
let attemps = 0

const maxAttempts = 5

function generateSequence() {
    const digits = []

    while (digits.length < 3) {
        const randomNum = Math.floor(Math.random() * 9) + 1
        if (!digits.includes(randomNum)) {
            digits.push(randomNum)
        }
    }
    secretSequence = digits.join('')
    console.log("Sequência secreta gerada:", secretSequence)
}

function updateAttemptsMessage() {
    const remaining = maxAttempts - attemps;
    document.getElementById('status-message').innerText = `Tentativas Restantes: ${remaining}`
}

function checkCorrectPosition(guessArr, secretArr) {
    let correctPosition = 0
    for (let i = 0; i < 3; i++) {
        if (guessArr[i] === secretArr[i]) {
            correctPosition++
            guessArr[i] = null
            secretArr[i] = null
        }
    }
    return correctPosition
}

function checkCorrectNumbers(guessArr, secretArr) {
    let correctCount = 0
    for (let i = 0; i < 3; i++) {
        if (guessArr[i] !== null && secretArr.includes(guessArr[i])) {
            correctCount++
            secretArr[secretArr.indexOf(guessArr[i])] = null
        }
    }
    return correctCount
}

function disableInput() {
    document.getElementById('guess').disabled = true
    document.querySelector('button[onclick="checkGuess()"]').disabled = true
    document.getElementById('restart-btn').style.display = 'inline-block'
}

function checkGuess() {
    const guessInput = document.getElementById('guess')
    const guess = guessInput.value

    if (guess.length !== 3 || new Set(guess).size !== 3 || !/^[1-9]{3}$/.test(guess)) {
        alert("Por favor, insira uma sequência válida de 3 números entre 1 e 9, sem repetições.")
        return
    } 
    
    attemps++

    const guessArr = guess.split('')
    const secretArr = secretSequence.split('')

    const correctPosition = checkCorrectPosition([...guessArr], [...secretArr])
    const correctCount = checkCorrectNumbers([...guessArr], [...secretArr])

    const attempList = document.getElementById('attempts-list')
    const listItem = document.createElement('li')


    listItem.innerHTML = `
    <span class="tentativa-label">Tentativa ${attemps}</span>: 
    <span class="guess-number">${guess}</span>
      <br>
    <span class="correct-numbers">
        <span class="highlight-number">${correctCount}</span> 
        <span class="label-text">número(s) correto(s)</span>
    </span>
    <br> 
    <span class="correct-position">
        <span class="highlight-number">${correctPosition}</span> 
        <span class="label-text">na ordem correta</span>
    </span>
`

    attempList.appendChild(listItem)

    if (correctPosition === 3) {
        document.getElementById('status-message').innerText = "Parabéns, você acertou a sequência!"
        disableInput()
    } else if (attemps >= maxAttempts) {
        document.getElementById('status-message').innerText = `Você perdeu! A sequência era ${secretSequence}`
        disableInput()
    } else {
        updateAttemptsMessage()
    }
    guessInput.value = ""
}

function restartGame(){
    attemps = 0
    generateSequence()
    document.getElementById('guess').disabled = false
    document.querySelector('button[onclick="checkGuess()"]').disabled = false
    document.getElementById('attempts-list').innerHTML = ''
    document.getElementById('status-message').innerText = ''
    document.getElementById('restart-btn').style.display = 'none'
    updateAttemptsMessage()
}

window.onload = function(){
    generateSequence()
    updateAttemptsMessage()
}