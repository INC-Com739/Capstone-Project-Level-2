document.addEventListener('DOMContentLoaded', function () {
    // Array of trivia questions
    const questions = [
        {
            question: "What is the name of the main character in Yu-Gi-Oh?",
            answer: "Yugi",
        },
        {
            question: "What is the name of Yugi's signature card?",
            answer: "Dark Magician",
        },
        {
            question: "What type of card is 'Blue-Eyes White Dragon'?",
            answer: "Monster",
        },
        {
            question: "What is the name of the card game played in Yu-Gi-Oh?",
            answer: "Duel Monsters",
        },
        {
            question: "Who is Yugi's rival?",
            answer: "Kaiba",
        },
        {
            question: "What is the name of the Egyptian God Cards?",
            answer: "Obelisk, Slifer, Ra",
        },
        {
            question: "What is the maximum number of cards in a Yu-Gi-Oh deck?",
            answer: "60",
        },
        {
            question: "What is the term for a card that can be played from your hand without cost?",
            answer: "Free summon",
        },
        {
            question: "What is the name of the organization that opposes Yugi and his friends?",
            answer: "Doma",
        },
        {
            question: "What is the name of Yugi's grandfather?",
            answer: "Sugoroku Mutou",
        }
    ];

    let currentQuestionIndex = 0;
    let startBtn=document.querySelector('#start');
    // Function to load a question
    function loadQuestion() {
        if (currentQuestionIndex !=0) { 
            startBtn.style.display = 'none'; // Hide the start button
        }
        const questionData = questions[currentQuestionIndex];
        document.querySelector('.card-title').textContent = `Trivia Question ${currentQuestionIndex + 1}`;
        document.querySelector('.card-text').textContent = questionData.question;
        document.getElementById('answer').value = ''; // Clear the input field
        document.querySelector('.valid-feedback').style.display = 'none';
        document.querySelector('.invalid-feedback').style.display = 'none';
    }

    // Handle form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const userAnswer = document.getElementById('answer').value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            document.querySelector('.valid-feedback').style.display = 'block';
            document.querySelector('.invalid-feedback').style.display = 'none';

            // Move to the next question after a short delay
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    // End of trivia
                    document.querySelector('.card-body').innerHTML = `
                        <h5 class="card-title">Congratulations!</h5>
                        <p class="card-text">You've completed the trivia!</p>
                    `;
                }
            }, 2000); // 2-second delay
        } else {
            document.querySelector('.valid-feedback').style.display = 'none';
            document.querySelector('.invalid-feedback').style.display = 'block';
        }
    });
    // Handle next question button
    document.getElementById('next-question').addEventListener('click', function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else if (currentQuestionIndex === questions.length-1) {
            getElementById('next-question').disabled = true;
        } 
    }
    );
    // Handle last question button
    document.getElementById('last-question').addEventListener('click', function () { 
        if (currentQuestionIndex ==0) {
            document.getElementById('last-question').disabled = true;
        } else {
        currentQuestionIndex= currentQuestionIndex-1
        loadQuestion();
}
        
    });
    // Handle reset trivia button
    document.getElementById('reset-trivia').addEventListener('click', function () {
        currentQuestionIndex = 0;
        loadQuestion();
       
        document.querySelector('.valid-feedback').style.display = 'none';
        document.querySelector('.invalid-feedback').style.display = 'none';
    });
    // Enable the next question button when the answer is correct
    document.querySelector('form').addEventListener('input', function () {
        const userAnswer = document.getElementById('answer').value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;
        document.getElementById('next-question').disabled = userAnswer.toLowerCase() !== correctAnswer.toLowerCase();
    });
    // Enable the last question button when the answer is correct
    document.querySelector('form').addEventListener('input', function () {
        const userAnswer = document.getElementById('answer').value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;
        document.getElementById('last-question').disabled = userAnswer.toLowerCase() !== correctAnswer.toLowerCase();
    });
    // Disable the next question button at question 9
    document.getElementById('next-question').disabled = currentQuestionIndex === questions.length - 9;
    // Disable the last question button at question 10
    document.getElementById('last-question').disabled = currentQuestionIndex === questions.length - 10;
    // Show the reset trivia button
    document.getElementById('reset-trivia').style.display = 'block';
    // Show the next question button
    document.getElementById('next-question').style.display = 'block';
    // Show the last question button
    document.getElementById('last-question').style.display = 'block';
    // Show the submit button
    document.querySelector('.btn-primary').style.display = 'block';
    // show the reset button at the end of the trivia
    document.getElementById('reset-trivia').style.display = 'block';

    // Load the first question
    loadQuestion();
});   