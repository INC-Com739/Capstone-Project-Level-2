document.addEventListener('DOMContentLoaded', async function () {
    let questions = [];
    let currentQuestionIndex = 0;

    // Fetch trivia questions from the API
    async function fetchQuestions() {
        try {
            const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4&sort=name');
            if (!response.ok) {
                throw new Error('Failed to fetch trivia questions');
            }
            const data = await response.json();

            // Generate trivia questions from the API data
            questions = data.data.map(card => ({
                question: `What is the type of the card "${card.name}"?`,
                answer: card.type,
                image: card.card_images ? card.card_images[0].image_url : null // Add card image if available
            }));

            loadQuestion();
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
            document.querySelector('.card-body').innerHTML = `
                <p class="card-text">Error loading trivia questions. Please try again later.</p>
            `;
        }
    }

    // Function to load a question
    function loadQuestion() {
        if (questions.length === 0) {
            document.querySelector('.card-body').innerHTML = `
                <p class="card-text">No trivia questions available.</p>
            `;
            return;
        }

        const questionData = questions[currentQuestionIndex];
        document.querySelector('.card-title').textContent = `Trivia Question ${currentQuestionIndex + 1}`;
        document.querySelector('.card-text').textContent = questionData.question;

        // Display card image if available
        const cardImageContainer = document.getElementById('card-image');
        if (questionData.image) {
            cardImageContainer.innerHTML = `<img src="${questionData.image}" alt="${questionData.question}" class="img-fluid">`;
        } else {
            cardImageContainer.innerHTML = '<p>No image available for this card.</p>';
        }

        document.getElementById('answer').value = ''; // Clear the input field
        document.querySelector('.valid-feedback').style.display = 'none';
        document.querySelector('.invalid-feedback').style.display = 'none';

        // Update button states
        document.getElementById('next-question').disabled = currentQuestionIndex >= questions.length - 1;
        document.getElementById('last-question').disabled = currentQuestionIndex <= 0;
    }

    // Handle form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const userAnswer = document.getElementById('answer').value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            document.querySelector('.valid-feedback').style.display = 'block';
            document.querySelector('.invalid-feedback').style.display = 'none';
            document.getElementById('next-question').disabled = false;
        } else {
            document.querySelector('.valid-feedback').style.display = 'none';
            document.querySelector('.invalid-feedback').style.display = 'block';
        }
    });

    // Handle next question button
    document.getElementById('next-question').addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    // Handle last question button
    document.getElementById('last-question').addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
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

    // Load questions from the API
    fetchQuestions();
});
   