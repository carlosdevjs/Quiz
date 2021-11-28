const form = document.querySelector('.quiz-form')
const popup = document.querySelector('.popup-wrapper')

const correctAnswers = ['C', 'D', 'A', 'B']

let score = 0

const getUserAnswers = () => {
    const userAnswers = []

    correctAnswers.forEach((_, index) => {
        const userAnswer = form[`inputQuestion${index + 1}`].value
        userAnswers.push(userAnswer)
    })

    return userAnswers
}

const calculaterUserScore = userAnswers => {
    userAnswers.forEach((userAnswer, index) => {
        const isAnsWerCorrect = userAnswer === correctAnswers[index]

        if (isAnsWerCorrect) {
            score += 25
        }
    })
}

const scrollToTop = () => {
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    popup.classList.remove('d-none')
}

const animationResultFinale = () => {
    let counter = 0

    const timer = setInterval(() => {
        popup.querySelector('#result').textContent = `${++counter}%`

        if (counter === score) {
            clearInterval(timer)
        }
    }, 20)
}

const updateQuiz = event => {
    event.preventDefault()

    const userAnswers = getUserAnswers()
    calculaterUserScore(userAnswers)
    scrollToTop()
    animationResultFinale()
}

const closedPopup = event => {
    const CSSClassName = event.target.classList[0]
    const CSSClasses = ['popup-closed', 'popup-wrapper', 'popup-link']
    const shoulClosedPopup = CSSClasses.some(CSSClass => CSSClass === CSSClassName)

    if (shoulClosedPopup) {
        popup.classList.add('d-none')
        score = 0
    }
}

form.addEventListener('submit', updateQuiz)
popup.addEventListener('click', closedPopup)
