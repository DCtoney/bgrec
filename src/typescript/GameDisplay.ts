import Game from "./Game";

/**
 * This is a helper function to generate individual table elements for each entry in a list
 * 
 * **Parameters**
 * ```ts
 * let data: string[]
 * ```
 * - The list of data to be processed, mechanics/generes of a game
 * ```ts
 * let parent: HTMLElement
 * ```
 *  - this is the HTML table element which will contain all of the elements of the list
 */
function populateFromList(data: string[], parent: HTMLElement) {
	data.forEach(tag => {
		parent.textContent += `${tag}, `;
	});
}

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
	document.getElementById("user-rate")!.innerHTML = `${game.ratingAverage}/10, with ${game.usersRated} Ratings`;
	document.getElementById("p-age")!.innerHTML = `${game.minimumAge}`;
	document.getElementById("p-count")!.innerHTML = `${game.minimumPlayers} - ${game.maximumPlayers}`; // test if min = max
	document.getElementById("estimated-time")!.innerHTML = `${game.minPlaytime} - ${game.maxPlaytime} mins`;
	document.getElementById("year-pub")!.innerHTML = `${game.yearPublished}`;
	populateFromList(game.genres, document.getElementById("genres")!);
	populateFromList(game.mechanics, document.getElementById("mechanics")!);
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