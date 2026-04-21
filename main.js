const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

searchBtn.addEventListener("click", async function() {
    const keyword = input.value;
    getInput(keyword)
    console.log("Step 1: Get Input")
    validate(keyword)
    console.log("Step 2: Validate")
    getData(keyword)
    console.log("Step 3: Get Input")
})

function getInput(keyword){
    status.textContent = keyword;
}

function validate(keyword){
    if (keyword.length >= 30 | keyword.trim() == "" ) {
        status.textContent = "Invalid Input";
        console.error("INVALID INPUT");
    }}

async function getData(keyword){
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    console.log(keyword)
    renderUI(data.posts, keyword)
}

function renderUI(posts, keyword){
    status.textContent = ("Searching for: " + keyword);
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            const newDiv = document.createElement("div");
            newDiv.className = "post";
            newDiv.textContent = post.title;
            output.appendChild(newDiv);
    }

    }
