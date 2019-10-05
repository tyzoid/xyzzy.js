const gamestate = require('./game/state.js');
const conf      = require('./conf.js');

module.exports.getStats = function() {
	return {
		"USERS":     gamestate.numUsers(),
		"GAMES":     gamestate.numGames(),
		"MAX_USERS": conf.max_users,
		"MAX_GAMES": conf.max_games,

		"GLOBAL_CHAT_ENABLED":     conf.chat.global,
		"GAME_CHAT_ENABLED":       conf.chat.game,
		"BLANK_CARDS_ENABLED":     conf.blank_cards,
		"METRICS_GAME_ENABLED":    conf.metrics.game,
		"METRICS_ROUND_ENABLED":   conf.metrics.round,
		"METRICS_SESSION_ENABLED": conf.metrics.session,
		"METRICS_USER_ENABLED":    conf.metrics.user,
	};
};

module.exports.getConfig = function() {
	return {
		// Hardcoded false in original java app, not sure their purpose
		"cah.DEBUG":        false,
		"cah.SILENT_DEBUG": false,

		// Hard code these, since they're not configurable here (yet?)
		"cah.AJAX_URI":     '/AjaxServlet',
		"cah.LONGPOLL_URI": '/LongPollServlet',

		"cah.COOKIE_DOMAIN":       conf.cookieDomain,
		"cah.GLOBAL_CHAT_ENABLED": conf.chat.global,
		"cah.GAME_CHAT_ENABLED":   conf.chat.game,
		"cah.INSECURE_ID_ALLOWED": conf.nicks.allowInsecure,
		"cah.BROADCASTING_USERS":  conf.chat.announceJoin,
	};
}

module.exports.legacy = {};

// First Load, returns info on cards / packs that are loaded.
module.exports.legacy.fl = function(args) {
	return {
		"next": "r",                 // Next command in flow
		"Gce": conf.chat.game,       // Game Chat Enabled
		"gce": conf.chat.global,     // Global Chat Enabled
		"SS": gamestate.startTime(), // Server Started Timestamp (milliseconds)
		"s": 0,                      // Serial
		"ip":false,                  // In Progress -> For now, assume all first loads are not returning users
		"css": [                     // Card Set List
			{"csd": "Base Game (US)", "wcid":500, "bd":false, "bcid":100, "w":1, "csn":"Base Game (US)", "cid":2}, // Example deck
		],
	}
}

// Register
module.exports.legacy.r = function(args) {
	console.log(args);
	return {};
}
