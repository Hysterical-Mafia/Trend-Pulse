export default async function handler(req, res) { 
    const rawKeyword = req.query.keyword;

    if (!rawKeyword) {
        return res.status(400).json({error: "Missing Keyword"})
    }
    const keyword = encodeURIComponent(rawKeyword);

    const redditUrl = `https://www.reddit.com/search.json?q=${keyword}`;

    const response =   await fetch(redditUrl,  {
        headers: {
            "User-Agent": "reddit-heatmap-app/1.0"
        }
    });
    const data = await response.json();
    const posts = data.data.children;

    const cleanPosts = [];
    const resultAmount = 30

    for (let i = 0; i < Math.min(posts.length, resultAmount); i++) {
        const post = posts[i].data;

        cleanPosts.push ({
            title: post.title,
            subreddit: post.subreddit_name_prefixed,
            upvotes: post.ups,
            downvotes: post.downs,
            ratio: post.upvote_ratio,
            permalink: `https://reddit.com${post.permalink}`,
        });
    }

    res.status(200).json({
        message: "You searched for " + rawKeyword,
        posts: cleanPosts
    });

}
