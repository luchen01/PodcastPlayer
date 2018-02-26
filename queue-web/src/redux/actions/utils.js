import { parseString } from 'xml2js';
import slug from 'slug';

const jjUrl = 'jj.xml'; // 'http://feeds.feedwrench.com/JavaScriptJabber.rss';
const lcUrl = 'lc.xml'; // 'http://feeds.feedburner.com/SlateLexiconValley';
const seUrl = 'se.xml'; // 'http://feed.songexploder.net/songexploder';
const waUrl = 'wa.xml'; // 'http://feeds.5by5.tv/webahead';
const casts = [jjUrl, lcUrl, seUrl, waUrl];

function destructureFeed(feed) {
  const {rss: {channel: [data]}} = feed;
  const feedInfo = {...data, slug: slug(data.title)};
  return Promise.resolve(feedInfo);
}

function parseFeed(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function fetchFeed(feed) {
  return fetch(feed)
    .then((r) => r.text())
    .then(parseFeed)
    .then(destructureFeed)
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.warn(e);
    });
}

export function fetchFeeds() {
  return Promise.all(casts.map(fetchFeed));
}
