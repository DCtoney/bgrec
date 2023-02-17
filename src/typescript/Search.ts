import { search } from "./global/BasicSearch";

let filters = $("#filters");
let userRating: number = 0;
localStorage.clear();
localStorage.setItem("genres", JSON.stringify([]));
localStorage.setItem("mechanics", JSON.stringify([]));

// Click main filter button
filters.on("click", _event => {
    filters.css({ display: "none" });
    filters.nextAll().css({ display: "flex" });
});

// Click individual filter buttons
filters.nextAll().on("click", function (_event) {
    if (this.id === "genre-button" || this.id === "mechanics-button") $(this).children(":first").css({ height: "10vw" });
    else if (this.firstElementChild!.id === "age-button") $(this).children(":first").css({ height: "3.25vw" });
    else $(this).children(":first").css({ height: "5.5vw" });
    this.style.setProperty("--rotation", "0deg");
});

filters.nextAll().on("mouseleave", function (_event) {
    $(this.firstElementChild!).css({ height: "0px" });
    this.style.setProperty("--rotation", "-90deg");
});

// Hide filter buttons
filters.parent().on("clickoutside", _event => {
    filters.nextAll().css({ display: "none" });
    filters.css({ display: "flex" });
});

// TODO: Add half-stars
$("img[data-star]").on("mouseenter", function (_event) {
    $(this).attr("src", "assets/images/full_star.png");
    userRating = 2;
    $(this).prevAll().each((_index, sibling) => {
        (sibling as HTMLImageElement).src = "assets/images/full_star.png";
        userRating += 2;
    });
    $(this).nextAll().attr("src", "asssets/images/empty_star.png");
});

// Genre Filter
{
    let selectionStates = [
        { color: "", data: "" }, 
        { color: "palegreen", data: "include" }, 
    ];

    $("#genre").children().attr("data-click-count", "0");
    $("#genre").children().on("click", function(_event) {
        let clickCount = Number($(this).attr("data-click-count")) + 1;
        let state = selectionStates[clickCount % selectionStates.length];

        $(this).css({ backgroundColor: state.color });
        $(this).attr("data-click-count", String(clickCount));

        let genres = JSON.parse(localStorage.getItem("genres")!);
        genres.push({ name: $(this).text(), state: state.data });
        localStorage.setItem("genres", JSON.stringify(genres));
    });

    $("#mechanics").children().attr("data-click-count", "0");
    $("#mechanics").children().on("click", function(_event) {
        let clickCount = Number($(this).attr("data-click-count")) + 1;
        let state = selectionStates[clickCount % selectionStates.length];

        $(this).css({ backgroundColor: state.color });
        $(this).attr("data-click-count", String(clickCount));

        let mechanics = JSON.parse(localStorage.getItem("mechanics")!);
        mechanics.push({ name: $(this).text(), state: state.data });
        localStorage.setItem("mechanics", JSON.stringify(mechanics));
    });
}

$("#search").on("keypress", function (event) {
    if (event.key === "Enter") {
        search($(this).prop("value"), { userRating });
    }
});
