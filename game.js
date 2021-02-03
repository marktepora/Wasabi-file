const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'It is defined as the process of artificially supplying water to soil for raising crops?',
        choice1: 'Rainfall',
        choice2: 'Irrigation',
        choice3: 'Watering',
        choice4: 'Delta',
        answer: 2,
    },
    {
        question:
            "This method avoids flooding the entire field surface by channeling the flow along the primary direction of the field using 'grooves' , 'lines' and 'furrow'",
        choice1: "Surface Irrigation",
        choice2: "Free Flooding",
        choice3: "Furrow Method",
        choice4: "Zig-zag Method",
        answer: 3,
    },
    {
        question: "This irrigation also called Trickle Irrigation",
        choice1: "Furrow Method",
        choice2: "Drip Irrigation",
        choice3: "Basin Flooding",
        choice4: "Border Strips",
        answer: 2,
    },
    {
        question: "This irrigation method is suitable for row crops like potatoes, maize, tabacco, and jowar",
        choice1: "Furrow Method",
        choice2: "Contour Farming",
        choice3: "Flooding Method",
        choice4: "Basin Flooding",
        answer: 1,
    },
    {
        question: 'It is a kind of artificial rainfall and it is very fruitful for crops grown in a farm',
        choice1: 'Flooding Method',
        choice2: 'Sprinkley Irrigation Method',
        choice3: 'Drip Irrigation',
        choice4: 'Sprinkler Irrigation',
        answer: 4,
    },
    {
        question: 'This filter are always installed for final filtration as an additional safeguard against clogging ,and contain a screen strainer that filters physical impurities that allows only clean  water to enter into micro irrigation system',
        choice1: 'Sand filter',
        choice2: 'Media filter',
        choice3: 'Screen filter',
        choice4: 'Centrifugal filter',
        answer: 3,
    },
    {
        question: 'Distribution network where in it transports the water within the field and distribute to submains',
        choice1: 'Mainline',
        choice2: 'Submains',
        choice3: 'Laterals',
        choice4: 'Valve',
        answer: 1,
    },
    {
        question: 'Small size nozzles that solaced on riser pipes fixed at uniform intervals along the length of the lateral pipe',
        choice1: 'Gate valve',
        choice2: 'Pressure gauge',
        choice3: 'Rotating head',
        choice4: 'Fertilizer tank',
        answer: 3,
    },
    {
        question: 'Tank that installed on sprinkler heads where different solutions of chemical fertilizers are made for their application along with irrigation',
        choice1: 'Water tank',
        choice2: 'Fertilizer tank',
        choice3: 'Small tank',
        choice4: 'Big tank',
        answer: 2,
    },
    {
        question: 'Distribute the water uniformly along their length by means of drippers or emitters',
        choice1: 'Emitter',
        choice2: 'Mainline',
        choice3: 'Submains',
        choice4: 'Laterals',
        answer: 4,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()