export default async function handler(req, res) { 
    const keyword = req.query.keyword;

    const redditUrl = `https://www.reddit.com/search.json?q=${keyword}`;

    const response =   await fetch(redditUrl);
    const data = await response.json();

    res.status(200).json({
        message: "You searched for " + keyword,
        redditData: data
    })
}
