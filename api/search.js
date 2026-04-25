const BASE_URL = "https://hn.algolia.com/api/v1/search?query=";

export default async function handler(req, res) { 
    const rawKeyword = req.query.keyword;

    if (!rawKeyword) {
        return res.status(400).json({error: "Missing Keyword"})
    }
    const keyword = encodeURIComponent(rawKeyword);

    const response = await fetch(`${BASE_URL}${keyword}`);
    const data = await response.json();

    const hits = data.hits || [];

    const cleanPosts = [];

    for (let i = 0; i < Math.min(hits.length, 30); i++) {
        const post = hits[i];

        cleanPosts.push ({
            title: post.title,
            author: post.author,
            score: post.points,
            time: post.created_at,
            url: post.url,
        });
    }

    res.status(200).json({
        message: "You searched for " + rawKeyword,
        posts: cleanPosts
    });

}