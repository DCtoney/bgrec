type InclusionState = "include" | "exclude";

let basicSearch = $("#nav-search").prev();

//open search bar when hovering nav search icon
$("#nav-search").on("mouseover", _event => {
    basicSearch.css({
        width: "25vw",
        paddingLeft: "1em",
        paddingRight: "1em"
    });
});

//Execute search when clicking icon
$("#nav-search").on("click", _event => {
    search(basicSearch.attr("value")!, { filters: false });
});

//close nav bar search when clicking away
$("#nav-search").parent().on("clickoutside", _event => {
    basicSearch.css({
        width: "",
        paddingLeft: "",
        paddingRight: ""
    });
});

//executes the search when pressing enter
basicSearch.on("keypress", event => {
    if (event.key === "Enter") {
        search(basicSearch.prop("value"), { filters: false });
    }
});

//default search bar behavior for home page
let defaultSearchOptions = {
    filters: true, 
    userRating: 0
};

/**
 * Searches the database for a game or set of games and redirects to the results page.
 * 
 * **Parameters**
 * ```ts
 * let term: string
 * ```
 * - The search term entered by the user
 * ```ts
 * let options = { filters: true }
 * ```
 * - The search options.
 *      - `filters: boolean = true`: Whether or not to use filters during the search.
 * 
 * **Examples**
 * ```ts
 * search("catan"); // Search with filters
 * search("gloomhaven", { filters: false }); // No filters, basic search
 * ```
 */
export function search(term: string, options: Partial<typeof defaultSearchOptions> = defaultSearchOptions): void {
    options = { ...defaultSearchOptions, ...options };

    // Filters
    if (options.filters) {
        sessionStorage.setItem("filters", "true");
        // Rating
        sessionStorage.setItem("minimumRating", String(options.userRating));
        sessionStorage.setItem("maximumRating", $("#and-above").is(":checked") ? String(Infinity) : String(options.userRating));

        // Playtime
        sessionStorage.setItem("minimumPlaytime", $("#min-playtime").attr("value") || "");
        sessionStorage.setItem("maximumPlaytime", $("#max-playtime").attr("value") || "");

        // Player Count
        sessionStorage.setItem("minimumPlayers", $("#min-player-count").attr("value") || "");
        sessionStorage.setItem("maximumPlayers", $("#max-player-count").attr("value") || "");

        // Age Range
        sessionStorage.setItem("minimumAge", $("#min-age").attr("value") || "");

        // Complexity
        sessionStorage.setItem("minimumComplexity", $("#min-complexity").attr("value") || "");
        sessionStorage.setItem("maximumComplexity", $("max-complexity").attr("value") || "");

        // Rank
        sessionStorage.setItem("minimumRank", $("#min-rank").attr("value") || "");
        sessionStorage.setItem("maximumRank", $("#max-rank").attr("value") || "");

        // Genre
        let genres: { name: string, state: InclusionState }[] = [];
        $("#genre").children().each((_index, child) => {
            if (child.hasAttribute("data-genre-state")) {
                genres.push({ name: child.innerHTML, state: child.getAttribute("data-genre-state") as InclusionState });
            }
        });
        sessionStorage.setItem("genres", JSON.stringify(genres));

        // Mechanics
        let mechanics: { name: string, state: InclusionState }[] = [];
        $("#genre").children().each((_index, child) => {
            if (child.hasAttribute("data-genre-state")) {
                mechanics.push({ name: child.innerHTML, state: child.getAttribute("data-genre-state") as InclusionState });
            }
        });
        sessionStorage.setItem("genres", JSON.stringify(genres));

        // Year Published
        sessionStorage.setItem("minimumYearPublished", $("#min-year-published").attr("value") || "");
        sessionStorage.setItem("maximumYearPublished", $("#max-year-published").attr("value") || "");
    }

    else {
        sessionStorage.setItem("filters", "false")
    }

    // Search
    sessionStorage.setItem("searchTerm", term);
    window.location.href = "./search-results.html";
}

/**
 * Searches the database for a game or set of games and but does not redirect to the results page.
 * Used for creating favorites on the profile page.
 * 
 * **Parameters**
 * ```ts
 * let term: string
 * ```
 * - The search term entered by the user
 * ```ts
 * let options = { filters: true }
 * ```
 * - The search options.
 *      - `filters: boolean = true`: Whether or not to use filters during the search.
 * 
 * **Examples**
 * ```ts
 * profileSearch("catan"); // Search with filters
 * profileSearch("gloomhaven", { filters: false }); // No filters, basic search
 * ```
 */
export function profileSearch(term: string, options: Partial<typeof defaultSearchOptions> = defaultSearchOptions): void {
    options = { ...defaultSearchOptions, ...options };

    // Filters
    if (options.filters) {
        sessionStorage.setItem("filters", "true");
        // Rating
        sessionStorage.setItem("minimumRating", String(options.userRating));
        sessionStorage.setItem("maximumRating", $("#and-above").is(":checked") ? String(Infinity) : String(options.userRating));

        // Playtime
        sessionStorage.setItem("minimumPlaytime", $("#min-playtime").attr("value") || "");
        sessionStorage.setItem("maximumPlaytime", $("#max-playtime").attr("value") || "");

        // Player Count
        sessionStorage.setItem("minimumPlayers", $("#min-player-count").attr("value") || "");
        sessionStorage.setItem("maximumPlayers", $("#max-player-count").attr("value") || "");

        // Age Range
        sessionStorage.setItem("minimumAge", $("#min-age").attr("value") || "");

        // Complexity
        sessionStorage.setItem("minimumComplexity", $("#min-complexity").attr("value") || "");
        sessionStorage.setItem("maximumComplexity", $("max-complexity").attr("value") || "");

        // Rank
        sessionStorage.setItem("minimumRank", $("#min-rank").attr("value") || "");
        sessionStorage.setItem("maximumRank", $("#max-rank").attr("value") || "");

        // Genre
        let genres: { name: string, state: InclusionState }[] = [];
        $("#genre").children().each((_index, child) => {
            if (child.hasAttribute("data-genre-state")) {
                genres.push({ name: child.innerHTML, state: child.getAttribute("data-genre-state") as InclusionState });
            }
        });
        sessionStorage.setItem("genres", JSON.stringify(genres));

        // Mechanics
        let mechanics: { name: string, state: InclusionState }[] = [];
        $("#genre").children().each((_index, child) => {
            if (child.hasAttribute("data-genre-state")) {
                mechanics.push({ name: child.innerHTML, state: child.getAttribute("data-genre-state") as InclusionState });
            }
        });
        sessionStorage.setItem("genres", JSON.stringify(genres));

        // Year Published
        sessionStorage.setItem("minimumYearPublished", $("#min-year-published").attr("value") || "");
        sessionStorage.setItem("maximumYearPublished", $("#max-year-published").attr("value") || "");
    }

    else {
        sessionStorage.setItem("filters", "false")
    }

    // Search
    sessionStorage.setItem("searchTerm", term);
}