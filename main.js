const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

input.addEventListener("keydown", function(enter) {
    if (enter.key === "Enter") {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", async function() {
    const keyword = input.value.trim().toLowerCase();

    // to make sure validate checks for words instead of letters, loop through each word in post.title seperate them and store them
    // then loop through them and store the ones that contain a word or rather the letters in which were types

    if (!validate(keyword)) {
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
        console.log("Error with " + keyword)
        //add later different error messages
        //ex. not enough characters for results, no search results found, limited results found 
        // not necessarily have to add the latter, mostly just for UI experience
        return false;
    }
    return true;
}

async function getData(keyword){
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    console.log("GetData: " + keyword)
    renderUI(data.posts, keyword)
}

function renderUI(posts, keyword){
    output.innerHTML = "";
    console.log(output.innerText)
    status.textContent = ("Searching for: " + keyword);
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            const newDiv = document.createElement("div");
            newDiv.className = "post";
            newDiv.textContent = post.title;
            output.appendChild(newDiv);
    }

    }
