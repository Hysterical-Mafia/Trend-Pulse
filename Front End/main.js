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

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const title = post.data.title;

        const newDiv = document.createElement("div");
        newDiv.id = "item" + i ;
        newDiv.className = "post";

        newDiv.textContent = title;
        output.appendChild(newDiv)
    }

});



