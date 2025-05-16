async function fetchCardInfo() {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data); // Process the data as needed
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchCardInfo();



document.querySelector('.btn-primary').addEventListener('click', async function () {
  try {
    // Show the spinner
    document.getElementById('spinner').style.display = 'block';

    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const response = await fetch(url); // Fetch the response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON data
    if (data.data && data.data.length > 0) {
      const card = data.data[0];
      const resultHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${card.name}</h5>
            <img src="${card.card_images[0].image_url_small}" class="card-img-top" alt="${card.name}">
            <p class="card-text">Type: ${card.type}</p>
            <p class="card-text">Level: ${card.level}</p>
          </div>
        </div>
      `;
      document.getElementById('result').innerHTML = resultHTML;
    } else {
      console.error('No card data available.');
    }
  } catch (error) {
    console.error('Error fetching random card:', error);
  } finally {
    // Hide the spinner
    document.getElementById('spinner').style.display = 'none';
  }
});
 // Enable Bootstrap tooltips
        document.addEventListener('DOMContentLoaded', function () {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
            const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
       document.getElementById('cardForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission

  try {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const response = await fetch(url); // Fetch the response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON data

    if (data.data && data.data.length > 0) {
      // Get user input
      const nameInput = document.getElementById('name').value.toLowerCase();
      const typeInput = document.getElementById('type').value;
      const eraInput = document.querySelector('input[name="era"]:checked')?.value;

      // Filter cards based on user input
      const filteredCards = data.data.filter(card => {
        const cardName = card.name ? card.name.toLowerCase() : '';
        const cardType = card.type || '';
        const cardEra = card.era || ''; // Adjust this if the API does not provide an "era" property

        return (
          cardName.includes(nameInput) &&
          cardType === typeInput &&
          (!eraInput || cardEra === eraInput) // Only filter by era if it's provided
        );
      });

      if (filteredCards.length > 0) {
        // Display the first matching card
        const card = filteredCards[0];
        const resultHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <img src="${card.card_images[0]?.image_url_small || ''}" class="card-img-top" alt="${card.name}">
              <p class="card-text">Type: ${card.type}</p>
              <p class="card-text">Level: ${card.level || 'N/A'}</p>
            </div>
          </div>
        `;
        document.getElementById('result').innerHTML = resultHTML;
      } else {
        document.getElementById('result').innerHTML = '<p>No matching card found.</p>';
      }
    } else {
      console.error('No card data available.');
    }
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
});
      // Generate random card information from the Yu-Gi-Oh API
document.querySelector('.btn-primary').addEventListener('click', async function () {
  try {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const response = await fetch(url); // Fetch the response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON data
    if (data.data && data.data.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * data.data.length);
      const card = data.data[randomIndex]; // Select a random card
      const resultHTML = `
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">${card.name}</h5>
            <img src="${card.card_images[0].image_url_small}" class="card-img-top" alt="${card.name}">
            <p class="card-text">Type: ${card.type}</p>
            <p class="card-text">Level: ${card.level || 'N/A'}</p>
          </div>
        </div>
      `;
      document.getElementById('result').innerHTML = resultHTML;
    } else {
      console.error('No card data available.');
    }
  } catch (error) {
    console.error('Error fetching random card:', error);
  }
});
            // Have the reset button reset the form after generating a random card and go back to the form
            document.getElementById('resetButton').addEventListener('click', function() {
                document.getElementById('cardForm').innerHTML = `
                <h2 class="name">Name</h2>
                <input type="text" class="form-control" id="name" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please enter a name.</div>
            </div>`;
                document.getElementById('result').innerHTML = '';
            });
        ;
            