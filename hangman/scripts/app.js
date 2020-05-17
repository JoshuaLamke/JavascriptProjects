// HTTP(Hypertext transfer protocol)
//Request -- what do we want to do
//Response -- what was actually done

let game1 
const puzzleEl = document.querySelector('#puzzle')
const remainingGuesses = document.querySelector('#remaining-guesses')
const render = () => {
    puzzleEl.innerHTML = ''
    remainingGuesses.textContent = game1.statusMessage
    const puzzleDiv = document.querySelector('#puzzle')
    game1.puzzle.split('').forEach((letter) => {
        const letterSpan = document.createElement('span')
        letterSpan.textContent = letter
        puzzleDiv.appendChild(letterSpan)
    })
}
window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})
const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

