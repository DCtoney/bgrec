import Game, { games, Games } from "./Game";
import { profileSearch } from "./global/BasicSearch";


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

function printArr(list: Game[]){
    let counter = 0
    list.forEach(game =>{
        console.log(counter + ": " + game.name)
        counter += 1;
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
        console.log("Favorites already in memory");
        printArr(favorites);
    }
    else favorites = [placeholder];
    console.log("Favorites not in memory");
    printArr(favorites);


    // find best matching game, pulled directly & shamelessly from Results.ts 
    if (!searchTerm) results = filtered.slice(0, 10);
    //@ts-ignore compiles fine, just an issue with placement of .tsconfig file
    else results = searchTerm.topGameMatches(10, filtered);

    // adding best matching game to the favs-array
    if (sessionStorage.getItem("fav-array") == null){
        console.log("Before splicing: ");
        printArr(favorites);
        favorites.push(results[0]);
        console.log("Splice 1: ");
        printArr(favorites);
        favorites.splice(0, 1);
        console.log("splice 2: ");
        printArr(favorites);
    } 
    else{
        console.log("Else block: ");
        printArr(favorites);
        favorites.push(results[0]);
        console.log("Else block after push:");
        printArr(favorites);
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

window.onload = () => {
    document.getElementById('uname')!.innerHTML = sessionStorage.getItem("username")!;
    let favorites = JSON.parse(sessionStorage.getItem("fav-array")!);
    if (favorites != null){
        printArr(favorites);
        displayGames(favorites);
    }
    else{
        console.log("could not find fav-array");
    }
}