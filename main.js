const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");
const randomBtn = document.getElementById("random-btn");

//UI state
let loading = false;
let currentPosts = [];

status.textContent = "Search something to get started";
if (randomBtn) {
    randomBtn.addEventListener("click", function () {
        if (!currentPosts || currentPosts.length === 0) return;

        const randomized = shuffle(currentPosts);
        renderUI(randomized, "random");
    });
}

input.addEventListener("keydown", function(enter) {
    if (enter.key === "Enter" && input.value.trim()) {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", async function() {
    if (loading) return;

    loading = true;

    try {
        const keyword = input.value.trim().toLowerCase();


        if (!validate(keyword)) {
            status.textContent = "Invalid Input";
            return;
        }
        await getData(keyword);
    } finally {
        loading = false;
    }
})

function validate(keyword){
    if (!keyword || keyword.length > 30) {
        return false;
    }
    return true;
}

async function getData(keyword){
    status.textContent = "Loading...";
    try {
        // Fetch search results from backend API using {keyword} as the query paramater
        const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
        if (!res.ok) {
            throw new Error("API Error: " + res.status);
        }

        const data = await res.json();
        if (!data.posts) {
            throw new Error("Wrong Response")
        }

        currentPosts = data.posts;
        renderUI(currentPosts, keyword);
    } 
    catch (err) {
        console.error(err);
        status.textContent = "Error fetching results"
    }
}

function renderUI(posts, keyword){
    output.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    status.textContent = ("Searching for: " + keyword);

    if (!posts || posts.length === 0) {
        status.textContent = "No results found";
        return;
    }
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const newDiv = document.createElement("div");
        newDiv.className = "post";

        newDiv.innerHTML = `
            <a href="${post.url}" target="_blank" rel="noopener noreferrer">
            <div class="title">${post.title || "No Title"}</div>
            <div class="meta">
                ${post.author || "unknown"} • ${post.score || 0} points
            </div>
        </a>
    `;

        output.appendChild(newDiv);
    }
    }

//Fisher–Yates shuffle, randomization of array order, unbiased
function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}
