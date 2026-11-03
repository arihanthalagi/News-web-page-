document.getElementById("searchBtn").addEventListener("click", getNews);

async function getNews() {

    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!query) {
        resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    const apikey = "pub_5409422ac3184261b9e8d82989bc3fee";

    const apiURL = `https://newsdata.io/api/1/latest?apikey=${apikey}&q=${encodeURIComponent(query)}&language=en`;

    resultsDiv.innerHTML = "<p>Loading news...</p>";

    try {

        const res = await fetch(apiURL);

        console.log("HTTP Status:", res.status);

        const data = await res.json();

        console.log("API Response:", data);

        if (!res.ok || data.status !== "success") {
            throw new Error(data.results?.message || data.message || "API request failed");
        }

        resultsDiv.innerHTML = "";

        if (data.results && data.results.length > 0) {

            data.results.forEach(article => {

                resultsDiv.innerHTML += `
                    <div class="news-item">
                        <h3>
                            <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                                ${article.title || "Untitled"}
                            </a>
                        </h3>

                        <p>${article.description || "No description available."}</p>

                        <small>
                            Source: ${article.source_name || "Unknown"}
                        </small>
                    </div>
                `;

            });

        } else {

            resultsDiv.innerHTML = "<p>No news found.</p>";

        }

    } catch (error) {

        console.error("News Error:", error);

        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;

    }
}
