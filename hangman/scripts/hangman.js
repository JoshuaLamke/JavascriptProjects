class Hangman{
    constructor(word, remainingGuesses){
        this.word = word.toLowerCase().split('')
        this.guessedLetters = []
        this.remainingGuesses = remainingGuesses
        this.status = 'playing'
    }
    calculateStatus(){
        const isPlaying = !this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        if(this.remainingGuesses <= 0){
            this.status = 'failed'
        }
        else if(isPlaying){
            this.status = 'playing'
        }
        else{
            this.status = 'finished'
        }
    }
    get statusMessage(){
        if(this.status === 'playing'){
            return `Remaining guesses: ${this.remainingGuesses}`
        }
        else if(this.status === 'failed'){
            return `Nice try! The word was "${this.word.join('')}".`
        }
        else{
            return `Great work! You guessed the word.`
        }
    }
    makeGuess(guess){
        if(this.status !== 'playing'){
            return
        }
        guess = guess.toLowerCase()
        if(this.guessedLetters.includes(guess)){
            return
        }
        this.guessedLetters.push(guess)
        if(!this.word.includes(guess)){
            this.remainingGuesses --
        }
        this.calculateStatus()
    }
    get puzzle(){
        let puzzle = ''
        this.word.forEach((letter) => {
            if(this.guessedLetters.includes(letter) || letter === ' '){
                puzzle += letter
            }
            else{
                puzzle += '*'
            }
        })
        return puzzle
    }
}
