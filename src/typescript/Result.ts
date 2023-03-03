import Game, { games, Games } from "./Game";

/**
 * helper function for createGameDisplay
 * adds a h1 tag for the game's title to the container
 *
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 *  - The game being loaded
 * ```ts
 * let container: HTMLElement
 * ```
 *  - the element on the page
 */
function createHeader(game: Game, container: HTMLElement) {
    let h1 = document.createElement("h1");
    h1.classList.add("title");
    h1.innerHTML = game.name;
    container.appendChild(h1);
}

/**
 * helper function for createGameDisplay
 * adds an <img> tag for the game's picture to the container
 *
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 *  - The game being loaded
 * ```ts
 * let container: HTMLElement
 * ```
 *  - the element on the page
 */
function createImage(game: Game, container: HTMLElement) {
    let gameImage = document.createElement("img");
    gameImage.src = game.imageLink;
    container.appendChild(gameImage);
}

/**
 * helper function for createGameDisplay
 * adds a <p> tag for the description of the game to the container
 *
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 *  - The game being loaded
 * ```ts
 * let container: HTMLElement
 * ```
 *  - the element on the page
 */
function createDescription(game: Game, container: HTMLElement) {
    let gameDescription = document.createElement("p");
    gameDescription.classList.add("description");
    gameDescription.innerHTML = game.shortDescription;
    container.appendChild(gameDescription);
}

/**
 * helper function for createGameDisplay
 * adds a <p> tag for the game's player count, complexity, playtime, and rating to the container
 *
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 *  - The game being loaded
 * ```ts
 * let container: HTMLElement
 * ```
 *  - the element on the page
 */
function getProperties(game: Game, properties: HTMLElement) {

    let playerRange = document.createElement("p");
    if (game.minimumPlayers != game.maximumPlayers) {
        playerRange.innerHTML = `${game.minimumPlayers} - ${game.maximumPlayers} Players`;
    }
    else {
        playerRange.innerHTML = `${game.maximumPlayers} Players`;
    }
    properties.appendChild(playerRange);

    let rating = document.createElement('p');
    rating.innerHTML = `Rating: ${game.ratingAverage} / 10`;
    properties.appendChild(rating);

    let complexity = document.createElement('p');
    complexity.innerHTML = `Complexity: ${game.complexityAverage} / 5`;
    properties.appendChild(complexity);

    let playtime = document.createElement('p');
    playtime.innerHTML = `Playtime: ${game.minPlaytime} - ${game.maxPlaytime} mins`;
    properties.appendChild(playtime);
}

/**
 * Generates all required elements for overview of the game to present on search results page
 *
 * **Parameters**
 * ```ts
 * let game: Game
 * ```
 *  - The game being loaded
 * 
 * **Returns**
 * 
 * The created div containing all required information about the game
 */
function createGameDisplay(game: Game): HTMLElement {
    let container = document.createElement("div");
    container.classList.add("container");

    //make game title
    createHeader(game, container);

    //container for the rest
    let gameInfo = document.createElement("div");
    gameInfo.classList.add("content");
    container.appendChild(gameInfo);

    createImage(game, gameInfo);

    //div for all text
    let gameProperties = document.createElement("div");
    gameProperties.classList.add("info");
    createDescription(game, gameProperties);

    //div for bottom text
    let gameAttributes = document.createElement("div");
    gameAttributes.classList.add("attributes");
    getProperties(game, gameAttributes);

    gameProperties.appendChild(gameAttributes);

    gameInfo.appendChild(gameProperties);

    container.addEventListener("click", function () {
        sessionStorage.setItem("game", JSON.stringify(game));
        window.location.href = "./gameDisplay.html";
    });

    return container;
}

function filteredResults(): Game[] {
    return sessionStorage.getItem("filters") === "true" ? Games.with({
        age: {
            minimum: Number(sessionStorage.getItem("minimumAge")) || -Infinity,
            maximum: Infinity
        },
        players: {
            minimum: Number(sessionStorage.getItem("minimumPlayers")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumPlayers")) || Infinity
        },
        yearPublished: {
            minimum: Number(sessionStorage.getItem("minimumYearPublished")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumYearPublished")) || Infinity
        },
        rating: {
            minimum: Number(sessionStorage.getItem("minimumRating")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumRating")) || Infinity
        },
        playtime: {
            minimum: Number(sessionStorage.getItem("minimumPlaytime")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumPlaytime")) || Infinity
        },
        complexity: {
            minimum: Number(sessionStorage.getItem("minimumComplexity")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumComplexity")) || Infinity
        },
        rank: {
            minimum: Number(sessionStorage.getItem("minimumRank")) || -Infinity,
            maximum: Number(sessionStorage.getItem("maximumRank")) || Infinity
        },
        genres: localStorage.getItem("genres")?.length ? JSON.parse(localStorage.getItem("genres")!) : undefined,
        mechanics: localStorage.getItem("mechanics")?.length ? JSON.parse(localStorage.getItem("mechanics")!) : undefined
    }) : games;
}

let main = document.getElementById("search-results")!;
let filtered = filteredResults();
let searchTerm = sessionStorage.getItem("searchTerm")!
let results: Game[];
if (!searchTerm) results = filtered.slice(0, 10);
else results = searchTerm.topGameMatches(10, filtered);
results.forEach(game => {
    let gameContainer = createGameDisplay(game);
    main.appendChild(gameContainer);
});
