import Game from "./Game";

/**
 * This populates the game result page with all of the game's properties as supplied by sessionStorage.
 * 
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 * - The game object collected from session storage
 */
function populateGame(game: Game) {
	document.getElementById("box-art")!.setAttribute("src", `${game.imageLink}`);
	document.getElementById("title")!.innerHTML = `${game.name}`;
	document.getElementById("description")!.innerHTML = `${game.longDescription}`;
	document.getElementById("glo-rank")!.innerHTML = `${game.rank}`;
	document.getElementById("user-rate")!.innerHTML = `${game.ratingAverage}`;
	document.getElementById("p-age")!.innerHTML = `${game.minimumAge}`;
	document.getElementById("p-count")!.innerHTML = `${game.minimumPlayers} - ${game.maximumPlayers}`; // test if min = max
	document.getElementById("estimated-time")!.innerHTML = `${game.minPlaytime} - ${game.maxPlaytime} mins`;
	document.getElementById("year-pub")!.innerHTML = `${game.yearPublished}`;
	document.getElementById("genres")!.innerHTML = `${game.genres.join(", ")}`;
	document.getElementById("mechanics")!.innerHTML = `${game.mechanics.join(", ")}`;
	document.getElementById("reference")!.setAttribute("href", `https://boardgamegeek.com/boardgame/${game.id}/${game.name}`);
}

let JSONGame = sessionStorage.getItem("game");
if (JSONGame) {
	let game: Game = JSON.parse(JSONGame);
	populateGame(game);
}
else {
	throw "An error has occurred retreiving game data from session storage.";
}