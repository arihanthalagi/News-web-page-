document.getElementById("searchBtn").addEventListener("click", getNews);

async function getNews() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term</p>";
    return;
  }

  const apikey = "1fa9a44e504848dca88475dcdf820f47";
  const apiURL = `https://newsdata.io/api/1/news?q=${encodeURIComponent(query)}&language=en&apikey=${apikey}`;

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiURL)}`;

  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    resultsDiv.innerHTML = "";

    if (data.results && data.results.length > 0) {
      data.results.forEach(article => {
        resultsDiv.innerHTML += `
          <div class="news-item">
            <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
            <p>${article.description || ""}</p>
          </div>
        `;
      });
    } else {
      resultsDiv.innerHTML = "<p>No news found.</p>";
    }
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Error loading news.</p>";
  }
}
