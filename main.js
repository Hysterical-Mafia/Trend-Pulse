const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        document.getElementById(searchBtn).click();
    }
});

searchBtn.addEventListener("click", async function() {
    const keyword = input.value;

    if (validate(keyword) === "title") {
        status.textContent = "Invalid Input";
        return;
    }
    getInput(keyword)
    await getData(keyword)

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
    output.innerHTML = "";
    console.log(output.innerText)
    status.textContent = ("Searching for: " + keyword);
        for (let i = 0; i < post.length; i++) {
            const post = posts[i];
            for (post in posts) {
                const newDiv = document.createElement("div");
                newDiv.className = "post";
                newDiv.textContent = post.title;
                output.appendChild(newDiv);
            };
        };
}
