import Game, { games } from "../Game";

declare global {

    interface String {

        /**
         * Returns a map of each game in the database and their name's Levenshtein distance to this string.
         * 
         * **Parameters**
         * ```ts
         * let gameSet?: Game[]
         * ```
         *  - The set of games to use. If none is provided, all games will be queried.
         * 
         * **Returns**
         * 
         * The map of games to Levenshtein distances.
         */
        gameMatchMap(this: string, gameSet?: Game[]): Map<Game, number>;

        /**
         * Returns the `Game` objects whose names closest resembles this string.
         * 
         * **Parameters**
         * ```ts
         * let matchCount
         * ``` 
         * - The amount of games to return.
         * ```ts
         * let gameSet?: Game[]
         * ```
         *  - The set of games to use. If none is provided, all games will be queried.
         * 
         * **Returns**
         * 
         * An array of `Game` objects of length `matchCount`, sorted from best match to worst.
         * 
         */
        topGameMatches(this: string, matchCount: number, gameSet?: Game[]): Game[];
    }
}

// Initialize the gameMatchMap function
String.prototype.gameMatchMap = function (gameSet?: Game[]): Map<Game, number> {
    let map = new Map<Game, number>();
    let lower = this.toLowerCase();
    (gameSet ?? games).forEach(game => {
        let distances: number[] = [];
        lower.split(" ").forEach(thisWord => {
            let best = Infinity;
            game.name.toLowerCase().split(" ").forEach(gameWord => {
                let ld = optimizedLevenshteinDistance(thisWord, gameWord);
                if (ld < best) best = ld;
            });
            distances.push(best);
        });
        let average = distances.reduce((a, b) => a + b) / distances.length;
        map.set(game, average);
    });
    return map;
};

// Initialize the topGameMatches function
String.prototype.topGameMatches = function (this: string, matchCount: number, gameSet?: Game[]): Game[] {
    let matches = this.gameMatchMap(gameSet);
    let sorted: { value: Game, distance: number }[] = [];
    matches.forEach((distance, game) => sorted.push({ value: game, distance: distance }));
    sorted.sort((a, b) => a.distance - b.distance);
    if (sorted.length <= matchCount) return sorted.map(obj => obj.value);
    return sorted.map(obj => obj.value).slice(0, matchCount);
}

/**
 * Calculates and returns the Levenshtein distance between two strings. The distance is a number
 * that represents the "minimum number of single-character edits (insertions, deletions, or
 * substitutions) required to change one word into the other". Essentially its a measure of
 * how close the two words are. The larger the number, the further the strings are apart.
 * This can be used when a user searches for a game name to find the top 10 that have the lowest
 * Levenshtein distance.
 * 
 * This function is far more optimized than the regular `levenshteinDistance()` function above,
 * lowering the search time from almost two minutes to under a second.
 * 
 * **Parameters**
 * ```ts
 * let a: string
 * ```
 *  - The first string
 * ```ts
 * let b: string
 * ```
 *  - b The second string
 * 
 * **Returns**
 * 
 *  The Levenshtein distance between the two strings.
 */
function optimizedLevenshteinDistance(a: string, b: string): number {
    let insertionCost: number;
    let deletionCost: number;
    let substitutionCost: number;

    let dummy: number[];
    let m = a.length;
    let n = b.length;

    let v0: number[] = [];
    let v1: number[] = []

    for (let i = 0; i <= n; i++) v0[i] = i;

    for (let i = 0; i < m; i++) {
        v1[0] = i + 1;

        for (let j = 0; j < n; j++) {
            deletionCost = v0[j + 1] + 1;
            insertionCost = v1[j] + 1;

            if (a.charAt(i) == b.charAt(j)) substitutionCost = v0[j];
            else substitutionCost = v0[j] + 1;

            v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost)
        }

        dummy = v0;
        v0 = v1;
        v1 = dummy;

    }

    return v0[n];
}

/*
 * Sift3 String matching algorithm found here: 
 * https://siderite.dev/blog/super-fast-and-accurate-string-distance-sift3.html/#at2549618140
 */
function sift3Distance(s1: string, s2: string) {
    if (s1 == null || s1.length === 0) {
        if (s2 == null || s2.length === 0) {
            return 0;
        } else {
            return s2.length;
        }
    }

    if (s2 == null || s2.length === 0) {
        return s1.length;
    }

    var c = 0;
    var offset1 = 0;
    var offset2 = 0;
    var lcs = 0;
    var maxOffset = 5;

    while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
        if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
            lcs++;
            lcs++;
        } else {
            offset1 = 0;
            offset2 = 0;
            for (var i = 0; i < maxOffset; i++) {
                if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
                    offset1 = i;
                    break;
                }
                if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
                    offset2 = i;
                    break;
                }
            }
        }
        c++;
    }
    return (s1.length + s2.length) / 2 - lcs;
}