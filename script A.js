document.getElementById("searchBtn").addEventListener("click", getNews);

async function getNews() {
    const query = document.getElementById("searchInput").value.trim();
    const apiKey = "c2e38691b5b7485493065b959df45a3a"; // Replace with your GNews API key
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&apikey=${apiKey}`;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        resultsDiv.innerHTML = "";

        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                const newsHTML = `
                    <div class="news-item">
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || ""}</p>
                    </div>
                `;
                resultsDiv.innerHTML += newsHTML;
            });
        } else {
            resultsDiv.innerHTML = "<p>No news found.</p>";
        }
    } catch (error) {
        resultsDiv.innerHTML = "<p>Error loading news.</p>";
        console.error(error);
    }
}
