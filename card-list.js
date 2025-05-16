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
      document.getElementById('cardForm').innerHTML = resultHTML;
    } else {
      console.error('No card data available.');
    }
  } catch (error) {
    console.error('Error fetching random card:', error);
  }
});


