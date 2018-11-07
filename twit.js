const Twit = require('twit')
const T = new Twit({
	consumer_key: 'AJ1UNHfhZnFdDk3QOJcArmKHL',
	consumer_secret: 'v8goB0Y8cp6eie1dXKAp2BRBfvi0WnK2zVvgNbOA5IwmTUZ2QD',
	access_token: '2303020602-ZZGGTjl47qKQFrxHzjAsl2319Pn2W5RWLYz9hLo',
	access_token_secret: 'DIAJDXdWoiuQLs2rJ9zsFa1XcAj2vLOPNB09c1Ij3rByB',
	timeout_ms: 60 * 1000 // you can use them, those are not mine anyway
})

const getFrankTweets = () =>
	new Promise((resolve, reject) => {
		T.get(
			'statuses/user_timeline',
			{
				screen_name: 'frankoceaninfo'
			},
			function(err, data) {
				if (err) {
					reject(err)
				}
				resolve(data)
			}
		)
	})

async function init() {
	try {
		const tweets = await getFrankTweets()
		const noRTtweets = tweets.filter(
			tweet => !tweet.hasOwnProperty('retweeted_status')
		)
		const latestTweet = {
			id: noRTtweets[0].id,
			date: noRTtweets[0].created_at,
			text: noRTtweets[0].text,
			lang: noRTtweets[0].lang
		}
		console.log(latestTweet)
	} catch (err) {
		console.log(err)
	}
}

init()
