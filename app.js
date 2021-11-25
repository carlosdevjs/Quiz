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
        const isResultResponseUser = userAnswer === correctAnswers[index]

        if (isResultResponseUser) {
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

const endClosedPopup = event => {
    const CSSClassName = event.target.classList[0]
    const listNames = ['popup-closed', 'popup-wrapper', 'popup-link']
    const closedPopup = listNames.some(listName => listName === CSSClassName)

    if (closedPopup) {
        popup.classList.add('d-none')
        score = 0
    }
}


form.addEventListener('submit', updateQuiz)
popup.addEventListener('click', endClosedPopup)