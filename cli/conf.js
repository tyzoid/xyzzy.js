module.exports = {
	max_users: 100,         // Max # of users
	max_games: 25,          // Max # of games
	chat: {
		global: false,      // Global chat enabled
		game: false,        // Game chat enabled
		announceJoin: true, // Broadcast join/leave messages
	},
	nicks: {
		allowInsecure: true,  // allow identification codes to be used without HTTPS
		validRegex:    /^[a-zA-Z0-9_-]\{3,32}$/,
	},
	blank_cards: false,         // Blank cards enabled
	metrics: {
		game: false,            // Game metrics
		round: false,           // Round Metrics
		session: false,         // Session Metrics
		user: false,            // User Metrics
	},
	cookieDomain: 'beta.notrly.xyz'
};
