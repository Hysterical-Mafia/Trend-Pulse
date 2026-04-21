const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

input.addEventListener("keypress", function(e) {
    if (e.key == "Enter")
        console.log("Enter With `enter` key")
})

searchBtn.addEventListener("click", async function() {
    output.textContent == "";
    const keyword = input.value;

    getInput(keyword)

    if (!validate(keyword)) {
        status.textContent = "Invalid Input";
        console.error("INVALID INPUT");
        return;
    }

    getData(keyword)

})

function getInput(keyword){
    status.textContent = keyword;
}

function validate(keyword){
    if (keyword.length >= 30 || keyword.trim() === "" ) {
        return false;
    }
    return true;
}

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
