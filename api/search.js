import Parser from "rss-parser";

const parser = new Parser();


//Hacker News Algolia API used as data source
const BASE_URL = "https://hn.algolia.com/api/v1/search?query=";

//RSS sources
const RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://arstechnica.com/feed/"
];

async function fetchRSS() {
    let items = [];
    
    for(const url of RSS_FEEDS) {
        try {
            const feed = await parser.parseURL(url);

            const mapped = (feed.items || [])
                .slice(0,10)
                .map(item => ({
                    title: item.title,
                    author: feed.title,
                    score: 0,
                    time: item.pubDate,
                    url: item.link,
                    sources: "rss"
                }));

            items.push(...mapped);
        } catch (err) {
            console.log("RSS fetch failed: ", url);
        }
    }
    return items;

}

export default async function handler(req, res) {
    
    try{
        const rawKeyword = req.query.keyword;

        if (!rawKeyword) {
            return res.status(400).json({error: "Missing Keyword" });
        }

        const keyword = encodeURIComponent(rawKeyword);
        const hnResponse = await fetch(`${BASE_URL}${keyword}`);

        if (!hnResponse.ok) {
            return res.status(502).json({error: "HN API Failed"})
        }

        const hnData = await hnResponse.json();

        const hnPosts = (hnData.hits || [])
            .filter(p => p.title)
            .slice(0, 20)
            .map(p => ({
                title: p.title,
                author: p.author,
                score: p.points,
                time: p.created_at,
                url: p.url || `https://news.ycombinator.com/item?id=${p.objectID}`,
                source: "hn"
            }));

            const rssPosts = await fetchRSS();

            const posts = [...hnPosts, ...rssPosts];

            posts.sort((a,b) => {
                return new Date(b.time) - new Date(a.time);
            });

            return res.status(200).json({posts: posts});
    
        } catch (err) {
            return res.status(500).json({error: "Server Crash", details: err.message});
        }    
}