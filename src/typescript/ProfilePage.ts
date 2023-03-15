import Game, { games, Games } from "./Game";
import { profileSearch } from "./global/BasicSearch";
import Quiz, {Result} from "./Quiz";


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

function displayGames(favorites: Game[]){
    let list = document.getElementById("list");
    list!.innerHTML = '';
    favorites.forEach(game => {
        let fave = createFavsDisplay(game);
        list!.appendChild(fave);
    });
}

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

function displayQuiz(){
    let containter = document.getElementById("quiz-display") as HTMLElement;
    let quiz = JSON.parse(sessionStorage.getItem("quiz")!) as Quiz;
    let result = JSON.parse(sessionStorage.getItem("result")!) as Result;

    containter.innerText = result.info;

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

$("#add").on("click", _event => {
    let searchTerm = (document.getElementById('search-term') as HTMLInputElement).value;
    if (searchTerm){
        profileSearch(searchTerm);
        let favorites = findFav(searchTerm);
        displayGames(favorites);
    }
});

$("#logout-button").on("click", _event => {
    // Remove all the relevant page details for the user from session storage
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