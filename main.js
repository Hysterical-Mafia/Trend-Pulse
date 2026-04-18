const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

function setStatus(text) {
    status.textContent = text;
}

function clearOutput() {
    output.innerHTML = "";
}

function renderPosts(posts) {
    clearOutput();

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.textContent = post.title;
        output.appendChild(div);
    });
}

async function searchReddit(keyword) {
    const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
        throw new Error("API request failed");
    }

    return await response.json();
}

searchBtn.addEventListener("click", async () => {
    const keyword = input.value.trim();

    if (!keyword) {
        alert("Input is empty");
        return;
    }

    try {
        setStatus(`Searching: ${keyword}...`);

        const data = await searchReddit(keyword);

        if (!data.posts || data.posts.length === 0) {
            setStatus("No results found");
            clearOutput();
            return;
        }

        setStatus(`Found ${data.posts.length} posts`);
        renderPosts(data.posts);

    } catch (err) {
        console.error(err);
        setStatus("Error fetching data");
        clearOutput();
    }
});