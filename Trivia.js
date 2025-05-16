document.addEventListener('DOMContentLoaded', async function () {
    let questions = [];
    let currentQuestionIndex = 0;

    // Custom anime questions
    const customQuestions = [
        {
            question: "What is the name of the main character in the original Yu-Gi-Oh! series?",
            answer: "Yugi Muto"
        },
        {
            question: "What is the name of Yugi's signature card?",
            answer: "Dark Magician"
        },
        {
            question: "Which character is known for using the 'Blue-Eyes White Dragon'?",
            answer: "Seto Kaiba"
        },
        {
            question: "What is the name of the tournament hosted by Maximillion Pegasus?",
            answer: "Duelist Kingdom"
        },
        {
            question: "In Yu-Gi-Oh! GX, what is Jaden Yuki's signature monster?",
            answer: "Elemental HERO Neos"
        },
        {
            question: "What is the name of the organization that opposes Yugi in the original series?",
            answer: "Doma"
        },
        {
            question: "In Yu-Gi-Oh! 5D's, what is the name of the city where the series takes place?",
            answer: "New Domino City"
        },
        {
            question: "What is the name of the card game played in Yu-Gi-Oh!?",
            answer: "Duel Monsters"
        },
        {
            question: "Who is known as the 'King of Games'?",
            answer: "Yugi Muto"
        },
        {
            question: "What is the name of the card that allows you to draw two cards?",
            answer: "Pot of Greed"
        },
        {
            question: "In Yu-Gi-Oh! ZEXAL, what is the name of Yuma Tsukumo's partner?",
            answer: "Astral"
        },
        {
            question: "What is the name of the card that can negate any spell card?",
            answer: "Mystical Space Typhoon"
        },
        {
            question: "In Yu-Gi-Oh! Arc-V, what is the name of the dimension where Yuya Sakaki lives?",
            answer: "Standard Dimension"
        },
        {
            question: "What is the name of the card that allows you to special summon a monster from your hand?",
            answer: "Monster Reborn"
        },
        {
            question: "In Yu-Gi-Oh! VRAINS, what is the name of the virtual reality world?",
            answer: "Link VRAINS"
        },
        {
            question: "What is the name of the card that can destroy all monsters on the field?",
            answer: "Raigeki"
        },
        {
            question: "In Yu-Gi-Oh! Sevens, what is the name of the protagonist's signature monster?",
            answer: "Rush Duel"
        },
        {
            question: "What is the name of the card that allows you to draw one card for each monster you control?",
            answer: "Graceful Charity"
        }
    ];

   // Fetch trivia questions from the API
    async function fetchQuestions() {
    try {
        // Show the spinner
        document.getElementById('spinner').style.display = 'block';

        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4&sort=name');
        if (!response.ok) {
            throw new Error('Failed to fetch trivia questions');
        }
        const data = await response.json();

        // Generate trivia questions from the API data
        const apiQuestions = data.data.map(card => {
            // Randomly select a question type
            const questionTypes = [
                { question: `What is the type of the card "${card.name}"?`, answer: card.type },
                { question: `What is the attribute of the card "${card.name}"?`, answer: card.attribute },
                { question: `What is the ATK of the card "${card.name}"?`, answer: card.atk?.toString() || "N/A" },
                { question: `What is the DEF of the card "${card.name}"?`, answer: card.def?.toString() || "N/A" },
                { question: `What is the level of the card "${card.name}"?`, answer: card.level?.toString() || "N/A" }
            ];
            const randomQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];

            return {
                ...randomQuestion,
                image: card.card_images ? card.card_images[0].image_url : null // Add card image if available
            };
        });

        // Combine API questions with custom questions
        questions = [...customQuestions, ...apiQuestions];

        // Shuffle the questions array
        questions = questions.sort(() => Math.random() - 0.5);

        loadQuestion();
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        document.querySelector('.card-body').innerHTML = `
            <p class="card-text">Error loading trivia questions. Please try again later.</p>
        `;
    } finally {
        // Hide the spinner
        document.getElementById('spinner').style.display = 'none';
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

        // Hide the card image initially
        const cardImageContainer = document.getElementById('card-image');
        cardImageContainer.innerHTML = ''; // Clear the image container
        cardImageContainer.style.display = 'none';

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

            // Show the card image
            const cardImageContainer = document.getElementById('card-image');
            const questionData = questions[currentQuestionIndex];
            if (questionData.image) {
                cardImageContainer.innerHTML = `<img src="${questionData.image}" alt="${questionData.question}" class="img-fluid">`;
                cardImageContainer.style.display = 'block';
            }
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