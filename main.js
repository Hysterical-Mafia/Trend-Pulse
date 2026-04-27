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
    await getData(keyword)

})

function validate(keyword){
    if (keyword.length >= 30 || keyword.trim() === "" ) {
        console.log("Error! " + keyword);
        //add later different error messages

        return false;
    }
    return true;
}

async function getData(keyword){

    //try statments, first check for network problems like no connection, timeout, dns
    //https response check if res.ok for 200-299 or res.status, code continues like everything fine no matter what
    //currently getting a contract, message with string, posts with array of objected and each object with certain fields like name,score etc.
    //  a failure could mean null or missing values or unexpected shaped.
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    console.log("Step 4: " + keyword)
    renderUI(data.posts, keyword)
}

function renderUI(posts, keyword){
    output.innerHTML = "";

    status.textContent = ("Searching for: " + keyword);
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            const newDiv = document.createElement("div");
            newDiv.className = "post";
            newDiv.textContent = post.title;
            output.appendChild(newDiv);
    }

    }
        //ex. not enough characters for results, no search results found, limited results found 
        // not necessarily have to add the latter, mostly just for UI experience