const express = require('express');

const app = express();
const port = Number.parseInt(process.env.PORT);

app.get('/', (req, res) => {
  res.send(`<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
  <channel>
   <title>Rain Alerts</title>
   <description>Posts on rainy days.</description>
   <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
   <pubDate>${new Date().toISOString()}</pubDate>
   <ttl>1800</ttl>
  
   <item>
    <title>Example entry</title>
    <description>Here is some text containing an interesting description.</description>
    <link>http://www.example.com/blog/post/1</link>
    <guid isPermaLink="false">7bd204c6-1655-4c27-aeee-53f933c5395f</guid>
    <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
   </item>
  
  </channel>
  </rss>`)
});

app.listen(port);