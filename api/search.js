//Hacker News Algolia API used as data source
const BASE_URL = "https://hn.algolia.com/api/v1/search?query=";

export default async function handler(req, res) {
    
    try{
        const rawKeyword = req.query.keyword;

        if (!rawKeyword) {
            return res.status(400).json({error: "Missing Keyword" });
        }

        const keyword = encodeURIComponent(rawKeyword);
        const response = await fetch(`${BASE_URL}${keyword}`);

        if (!response.ok) {
            return res.status(502).json({error: "API Failed (upstream)"})
        }

        const data = await response.json();
        const hits = data.hits || [];
        // Remove posts without titles and limit size to at most 30 at a time
        const cleanPosts = hits
            .filter(post => post.title)
            .slice(0, 30)
            .map(post => ({
                title: post.title,
                author: post.author,
                score: post.points,
                time: post.created_at,
                url: post.url || `https://news.ycombinator.com/item?id=${post.objectID}`,
        }));

        return res.status(200).json({posts: cleanPosts});
    
    } catch (err) {
        return res.status(500).json({error: "Server Crash", details: err.message});
    }    
}