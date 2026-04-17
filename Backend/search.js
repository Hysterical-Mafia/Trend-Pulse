export default async function handler(req, res) { 
    const keyword = req.query.keyword;

    const redditUrl = `https://www.reddit.com/search.json?q=${keyword}`;

    const response =   await fetch(redditUrl);
    const data = await response.json();
    const posts = data.data.children;

    const cleanPosts = [];

    for (let i = 0; i < Math.min(posts.length, 30); i++) {
        const post = posts[i];

        const title = post.data.title;
        const subreddit = post.data.subreddit_name_prefixed;

        const upvotes = post.data.ups;
        const downvotes = post.data.downs;
        const ratio = post.data.upvote_ratio;
        const permalink = post.data.permalink;


    }
    
    res.status(200).json({
        message: "You searched for " + keyword,
        posts: [
            {title},
            {subreddit},
            {upvotes},
            {permalink},
            {ratio},
            {downvotes},
        ]

    })

}
