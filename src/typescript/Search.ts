import { search } from "./global/BasicSearch";

let filters = $("#filters");
let userRating: number = 0;

// Click filter button
filters.on("click", _event => {
    filters.css({ display: "none" });
    filters.nextAll().css({ display: "flex" });
});

// Click filter buttons
filters.nextAll().on("click", function (_event) {
    if (this.firstElementChild!.id === "genre-button") $(this).children(":first").css({ height: "10vw" });
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

let selectionStates = [{ color: "", data: "" }, { color: "palegreen", data: "included" }, { color: "lightpink", data: "excluded" }];
$("#genre").children().attr("data-click-count", "0");
$("#genre").children().on("click", function(_event) {
    let clickCount = Number($(this).prop("data-click-count")) + 1;
    let state = selectionStates[clickCount % selectionStates.length];
    $(this).css({ backgroundColor: state.color });
    if (state.data) $(this).attr("data-genre-state", state.data);
    $(this).attr("data-click-count", String(clickCount));
});

$("#search").on("keypress", function (event) {
    if (event.key === "Enter") {
        search($(this).prop("value"), { userRating });
    }
});
