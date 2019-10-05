var startTime = Date.now();

var users = [];
var games = [];

module.exports = {
	numUsers: () => users.length,
	numGames: () => games.length,
	startTime: () => startTime,
};
