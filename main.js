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
        return false;
    }
    return true;
}

async function getData(keyword){
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    renderUI(data.posts)
}

function renderUI(keyword){
    status.innerHTML = ("Searching for: " + keyword)
}
