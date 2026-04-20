const BASE_URL = "https://hn.algolia.com/api/v1/search?query=";

export default async function handler(req, res) { 
    const rawKeyword = req.query.keyword;

    if (!rawKeyword) {
        return res.status(400).json({error: "Missing Keyword"})
    }
    const keyword = encodeURIComponent(rawKeyword);

    const response = await fetch(BASE_URL)
    const data = await response.json();

    const hits = data.hits;

    const cleanPosts = [];

    for (let i = 0; i < Math.min(posts.length, 30); i++) {
        const post = hits[i];

        cleanPosts.push ({
            title: post.title,
            type: post.type,
            score: post.score,
            time: post.time,
            url: post.url,
            userCreated: post.created,
            url: post.url,

        });
    }

    res.status(200).json({
        message: "You searched for " + rawKeyword,
        posts: cleanPosts
    });

}