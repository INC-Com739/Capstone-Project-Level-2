async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[Math.floor(Math.random() * data.data.length)]; // Select a random card
    } else {
      throw new Error("No card data available.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


document.querySelector('.btn-primary').addEventListener('click', async function() {
  try {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const data = await fetch(url); 
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
      console.error("No card data available.");
    }
  } catch (error) {
    console.error("Error fetching random card:", error);
  }
});



