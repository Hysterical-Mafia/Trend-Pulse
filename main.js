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
    getData.async(keyword)
    console.log("Step 3: Get Data")
})

function getInput(keyword){
    status.textContent = keyword;
}

function validate(keyword){
    if (keyword.length(keyword) >= 30 | keyword.trim() == "" ) {
        status.textContent = "Invalid Input";
        console.error("INVALID INPUT")
    }}

function getData(keyword){
    url = fetch(`/api/search?keyword=${keyword}`);
    console.log("Data Fetch")
}

function renderUI(keyword){
    output.textContent = keyword
}
