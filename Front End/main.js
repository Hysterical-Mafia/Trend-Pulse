const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");

function updateOutput(text) {
    output.textContent = text;
}
searchBtn.addEventListener("click", async function() {
    const keyword = input.value; 

    if (keyword.trim() == "") {
        alert("my input has no value");
        return;
    }
    updateOutput("Searching for: " + keyword)

    const url = "http://localhost:3000/search?keyword=" + keyword;  
    const response = await fetch(url);
    const data = await response.json();
    
    const posts = data.data.children;
    console.log(posts)

    for (let i = 0; i < posts.length; i++) {
        console.log("Test Run", i)
    }


});



