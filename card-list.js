async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
 // Generate random card information from the yugioh API
        document.querySelector('.btn-primary').addEventListener('click', async function() {
            try {
            const url = 'https://db.ygoprodeck.com/api/v7/randomcard.php';
            const response = await fetch(url, {headers: {"Access-Control-Allow-Origin":"*"}});
            const data = await response.json();
            const resultHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${data.data[0].name}</h5>
                        <img src="${data.data[0].card_images[0].image_url_small}" class="card-img-top" alt="${data.data[0].name}">
                        <p class="card-text">Type: ${data.data[0].type}</p>
                        <p class="card-text">Level: ${data.data[0].level}</p>
                    </div>
                </div>
            `;
     
            document.getElementById('cardForm').innerHTML = resultHTML;
            
            } catch (error) {
                console.error("Error fetching random card:", error);
            }
        })