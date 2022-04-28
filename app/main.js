import express from 'express';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const app = express();
const port = Number.parseInt(process.env.PORT);

const weatherUrl = 'https://weather.com/weather/hourbyhour/l/San+Mateo+CA?canonicalCityId=660fecd1e7fdfd732a35b6e25c98aa50a993ec1afeac74e9b179a57eae331770';

app.get('/', async (req, res) => {

  const response = await fetch(weatherUrl);
  const body = await response.text();
  const dom = parse(body);
  const rainChange = Number.parseInt(dom.querySelector('[data-testid="DetailsSummary"] [data-testid="PercentageValue"]').firstChild.text.replace('%', ''));

  const ds = new Date().toISOString();
  const day = new Date();
  day.setHours(7);
  day.setMinutes(0);
  day.setSeconds(0);
  day.setMilliseconds(0);
  const dateStr = day.toISOString();

  const item = rainChange > 10 ? `<item>
  <title>Rain Alert!</title>
  <description>${rainChange}% chance of rain today.</description>
  <link>${weatherUrl}</link>
  <pubDate>${dateStr}</pubDate>
 </item>` : '';

  res.setHeader('content-type', 'text/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
  <channel>
   <title>Weather Alerts</title>
   <description>Rainy day feed.</description>
   <lastBuildDate>${ds}</lastBuildDate>
   <pubDate>${ds}</pubDate>
   <ttl>1800</ttl>
  
  ${item}
  
  </channel>
  </rss>`);
});

app.listen(port);