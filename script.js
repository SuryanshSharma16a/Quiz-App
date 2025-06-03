const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["J.K. Rowling", "Harper Lee", "Stephen King", "Mark Twain"],
        correctAnswer: "Harper Lee"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
            option.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }

    nextButton.style.display = 'block';
    clearInterval(timer);
}

function startTimer() {
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(null);
        }
    }, 1000);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
        nextButton.style.display = 'none';
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
    resultElement.textContent = `Your final score: ${score}/${questions.length}`;
}

startQuiz();