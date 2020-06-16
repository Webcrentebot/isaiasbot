const Twit = require('twit');

/*
 * - Insert each Twitter credential inside it's equivalent quote.
 */
const config = {
  consumer_key: 'co1Q1GiekJZJ4eyOtzPEbNcaz',
  consumer_secret: 'wZaBALj1MSKX22D9smjL0IFD9611CX7VYfu2xU28hOKNtaPIky',
  access_token: '1272323184411512833-tDthFufIur9Sul5i3TY6zUj58tIqap',
  access_token_secret: 'fOyZgXk7uRmkqLzN5utY4oWmbF5dJfea1BruiUGNMjjoA',
};

/*
 * - Replace "ex1, ex2" with the words you want to retweet.
 * - Separate words with commas.
 * - Keep words inside quotes.
 * - DO NOT repeat the same word with caps on and off (example: "word,Word,WORD").
 * - If "example" is between the selected words, the bot will retweet any variation of the word:
 *   example,Example,EXAMPLE,ExAmPlE...
 */
const words = 'sdv,flb';

/*
 * - Change 'mybot' with your bot account '@'.
 * - Example: if your account '@' is '@twitter_bot', you should write only 'twitter_bot'
 */
const screenName = 'sdv_bot';

/*
 * If you are a not a programmer, avoid changing anything on the next lines
 */

const twit = new Twit(config);
const stream = twit.stream('statuses/filter', { track: words.split(',') });

console.log('Bot is starting!');
try {
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name === screenName) return;

    if (!tweet.retweeted_status) {
      twit.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
        if (err || !data.text) {
          return console.log(`Error retweeting user "@${tweet.user.screen_name}"`);
        }
        console.log(`Retweeted user "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      });
    }
  });
} catch (_) {
  console.log('An error ocurred.');
  process.exit();
}
