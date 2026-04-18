export default async function handler(req, res) {
    try {
        const rawKeyword = req.query.keyword;

        if (!rawKeyword) {
            return res.status(400).json({
                error: "Missing keyword"
            });
        }

        const keyword = encodeURIComponent(rawKeyword);
        const url = `https://www.reddit.com/search.json?q=${keyword}&limit=30`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "reddit-heatmap-app/1.0"
            }
        });

        if (!response.ok) {
            return res.status(500).json({
                error: "Failed to fetch Reddit data"
            });
        }

        const data = await response.json();

        const children = data?.data?.children || [];

        const posts = children.slice(0, 30).map(item => {
            const post = item.data;

            return {
                title: post.title,
                subreddit: post.subreddit_name_prefixed,
                upvotes: post.ups,
                downvotes: post.downs,
                ratio: post.upvote_ratio,
                permalink: `https://reddit.com${post.permalink}`
            };
        });

        return res.status(200).json({
            keyword: rawKeyword,
            posts
        });

    } catch (err) {
        return res.status(500).json({
            error: "Server crash",
            details: err.message
        });
    }
}