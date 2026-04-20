const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

function updateOutput(text) {
    status.textContent = text;
    console.log("First test")
}
    searchBtn.addEventListener("click", async function() {
    const keyword = input.value; 

    if (keyword.trim() == "") {
        alert("my input has no value");
        return;
    }
    updateOutput("Searching for: " + keyword);
    console.log("Second test");
    
    const response = await fetch(`/api/search?keyword=${keyword}`);
    const data = await response.json();

    output.innerHTML = "";

    for (let i = 0; i < data.posts.length; i++) {
        const post = data.posts[i];

        const newDiv = document.createElement("div");
        newDiv.className = "post";
        newDiv.textContent = post.title;
        output.appendChild(newDiv);
    }
});



