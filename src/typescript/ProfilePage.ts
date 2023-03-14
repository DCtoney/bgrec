import Game, { games, Games } from "./Game";
import { profileSearch } from "./global/BasicSearch";

$("#logout-button").on("click", _event => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    window.location.href = "./profile-login.html";
});

window.onload = () => {
    document.getElementById('uname')!.innerHTML = sessionStorage.getItem("username")!;
}