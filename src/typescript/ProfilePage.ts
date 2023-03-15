import Game, { games, Games } from "./Game";
import { profileSearch } from "./global/BasicSearch";
import Quiz, {Result} from "./Quiz";

/**
 * Helper function to generate displays for each favorited game.
 * 
 * **Parameters**
 * ```ts
 * let fave:Game
 * ```
 *  - The Game object from favorites list that needs a display made.
 * 
 * **Returns**
 * 
 * The created div containing a clickable box art display.
 */
function createFavsDisplay(fave: Game): HTMLElement{
    let container = document.createElement("div");
    container.classList.add("div");

    let gameImg = document.createElement("img");
    gameImg.src = fave.imageLink;
    container.appendChild(gameImg);

    container.addEventListener("click", function () {
        sessionStorage.setItem("game", JSON.stringify(fave));
        window.location.href = "./gameDisplay.html";
    });

    return container;
}

/**
 * A function to display the list of favorited games to the user.
 * 
 * **Parameters**
 * ```ts
 * let favorites: Game[]
 * ```
 *  - An array of Games, containing all the Games the user has added to their favorites list.
 */
function displayGames(favorites: Game[]){
    let list = document.getElementById("list");
    list!.innerHTML = '';
    favorites.forEach(game => {
        let fave = createFavsDisplay(game);
        list!.appendChild(fave);
    });
}

/**
 * Helper function that generates the list of favorited games.
 * 
 * **Parameters**
 * ```ts
 * let searchTerm: String
 * ```
 *  - A string representing the title of a game the user is searching for.
 * 
 * **Returns**
 * 
 * The saved array of favorite Games, with the game best matching with searchTerm appended to it.
 */
function findFav(searchTerm: String): Game[]{
    let favorites: Game[];
    let placeholder = Games.getGameByID(1);
    let filtered = filteredResults();
    let results: Game[]

    // if a favs array already exists
    if (sessionStorage.getItem("fav-array")){
        favorites = JSON.parse(sessionStorage.getItem("fav-array")!);
    }
    else favorites = [placeholder];

    // find best matching game, pulled directly & shamelessly from Results.ts 
    if (!searchTerm) results = filtered.slice(0, 10);
    //@ts-ignore compiles fine, just an issue with placement of .tsconfig file
    else results = searchTerm.topGameMatches(10, filtered);

    // adding best matching game to the favs-array
    if (sessionStorage.getItem("fav-array") == null){
        favorites.push(results[0]);
        favorites.splice(0, 1);
    } 
    else{
        favorites.push(results[0]);
    }

    // putting in session storage and returning the array
    sessionStorage.setItem("fav-array", JSON.stringify(favorites));
    return favorites;
}

/**
 * Helper function to find the first game that best matches the term the user searched for.
 * 
 * **Returns**
 * 
 * An array of all games in BGG_DATA.json ordered by how best they match the given filters
 */
function filteredResults(): Game[] {
    // shamelessly stolen from Result.ts, thank you Nick
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

/**
 * Function to set the user's profile picture based on their username
 * 
 * **Parameters**
 * ```ts
 * let username: String
 * ```
 *  - A String representing the username provided at log in.
 *  - If it matches one of the founders' names, use their picture as the profile picture, else use trent.jpg
 */
function determineProfilePic(username: String){
    let pic = document.getElementById("pic") as HTMLImageElement;
    if (username == "Trent"){
        pic.src="/assets/images/Trent-Real.jpg";
    } else if (username == "Nick"){
        pic.src="/assets/images/Nick.jpg";
    } else if (username == "Brendan"){
        pic.src="/assets/images/Brendan.jpg";
    } else if (username == "Dante"){
        pic.src="/assets/images/Dante.jpg";
    } else {
        pic.src ="/assets/images/trent.jpg";
    }
}

/**
 * A function to generate displays for relevant quiz information.
 */
function displayQuiz(){
    let containter = document.getElementById("quiz-display") as HTMLElement;
    let result = JSON.parse(sessionStorage.getItem("result")!) as Result;
    // set suggestion text to be result description
    containter.innerText = result.info;

    // display suggestions per Forage style, adapted from QuizResults.ts
    let suggestions = document.createElement("div");
    suggestions.classList.add("suggestions-container")
    result.suggestions.forEach(suggestion => {
        let game = Games.getGameByID(suggestion[1]);

        let suggestionContainer = document.createElement("div");
        suggestionContainer.classList.add("suggestion");

        let suggestionImage = document.createElement("img");
        suggestionImage.src = game.imageLink;
        suggestionContainer.appendChild(suggestionImage);

        let suggestionName = document.createElement("p");
        suggestionName.innerHTML = suggestion[0];
        suggestionContainer.appendChild(suggestionName);
        
        suggestionContainer.onclick = function() {
            sessionStorage.setItem("game", JSON.stringify(game));
            window.location.href = "/src/html/gameDisplay.html";
        }
        suggestions.appendChild(suggestionContainer);
    });

    containter.appendChild(suggestions);
}

/**
 * Listener for Add Favorites button, handles searching the database 
 * for given search term as well as creating and updating the game displays.
 */
$("#add").on("click", _event => {
    let searchTerm = (document.getElementById('search-term') as HTMLInputElement).value;
    if (searchTerm){
        profileSearch(searchTerm);
        let favorites = findFav(searchTerm);
        displayGames(favorites);
    }
});

/**
 * Listener for Logout button, removes all non-shared information from sessionstorage
 */
$("#logout-button").on("click", _event => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("fav-array");
    sessionStorage.removeItem("bio");
    sessionStorage.removeItem("searchTerm");
    sessionStorage.removeItem("game");
    sessionStorage.removeItem("maximumPlaytime");
    sessionStorage.removeItem("maximumRank");
    sessionStorage.removeItem("minimumComplexity");
    sessionStorage.removeItem("minimumRank");
    sessionStorage.removeItem("maximumPlayers");
    sessionStorage.removeItem("maximumRating");
    sessionStorage.removeItem("filters");
    sessionStorage.removeItem("genres");
    sessionStorage.removeItem("minimumYearPublished");
    sessionStorage.removeItem("minimumAge");
    sessionStorage.removeItem("maximumComplexity");
    sessionStorage.removeItem("minimumPlaytime");
    sessionStorage.removeItem("minimumRating");
    sessionStorage.removeItem("minimumPlayers");
    sessionStorage.removeItem("maximumYearPublished")
    window.location.href = "./profile-login.html";
});

/**
 * Listener for changes to the user's bio, saves to sessionStorage after every change.
 */
document.getElementById("bio")!.addEventListener("input", function() {
    sessionStorage.setItem("bio", document.getElementById("bio")!.innerText);
});

window.onload = () => {
    let username = sessionStorage.getItem("username")!;
    let favorites = JSON.parse(sessionStorage.getItem("fav-array")!);
    let bio = sessionStorage.getItem("bio")!;
    let description = document.getElementById("bio");

    determineProfilePic(username);
    document.getElementById('uname')!.innerHTML = username;
    displayQuiz();
    
    if (favorites != null){
        displayGames(favorites);
    }
    
    if (bio != null){
        description!.innerText = bio
    } else {
        description!.innerText = "Tell us about yourself! Click me to edit."
    }
}