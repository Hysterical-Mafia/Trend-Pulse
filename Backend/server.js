const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
    const keyword = req.query.keyword;

    const url = "https://www.reddit.com/r/technology/search.json?q=" +
        keyword +
        "&restrict_sr=1&sort=new";

    const response = await fetch(url)
    const data = await response.json();

    res.json(data);
});

app.listen(3000, () => {
    console.log("Server Running on ...")
});