// @ts-ignore
import BGGdata from './data/BGG_DATA.json' assert { type: "json" };

// @ts-ignore
export const games = BGGdata.games as Game[];

interface Range {
    maximum: number;
    minimum: number;
}

export type InclusionState = "include" | "exclude";

export interface GameFilters {
    yearPublished: Range;
    playtime: Range;
    age: Range;
    rating: Range;
    complexity: Range;
    players: Range;
    rank: Range;
    mechanics: { name: string, state: InclusionState }[];
    genres: { name: string, state: InclusionState }[];
    gameSet: Game[];
}

/**
 * A `Game` object representing a physical board game.
 */
export default class Game {
    public id: number;
    public name: string;
    public yearPublished: number;
    public minimumPlayers: number;
    public maximumPlayers: number;
    public minPlaytime: number;
    public maxPlaytime: number;
    public minimumAge: number;
    public usersRated: number;
    public ratingAverage: number;
    public rank: number;
    public complexityAverage: number;
    public ownedUsers: number;
    public mechanics: string[];
    public genres: string[];
    public types: string[];
    public imageLink: string;
    public shortDescription: string;
    public longDescription: string;
    public publishers: string[];
}

export class Games {

    /**
     * Returns all games that matches the given properties.
     * 
     * **Example Usage**
     * ```ts
     * let soloGames = Games.with({ maximumPlayers: 1 });
     * ```
     * 
     * **Parameters**
     * ```ts
     * let filters: Partial<GameProperties>
     * ```
     * - The properties the games must have. If no value is given for `filters.gameSet`, the set of all games is used. If a filter
     * is not present, it is ignored (not included or excluded). If no filters are present, all games will be returned. 
     * 
     * **Returns**
     * 
     * Returns all `Game` objects that match given properties.
     */
     public static with(filters: Partial<GameFilters>): Game[] {
        let correctGames: Game[] = [];
        (filters.gameSet?.length ? filters.gameSet : games).forEach(game => {
            
            if (filters.players && !(filters.players.maximum >= game.maximumPlayers && game.minimumPlayers >= filters.players.minimum)) return;
            if (filters.age && !(game.minimumAge >= filters.age.minimum )) return;
            if (filters.playtime && !(filters.playtime.maximum >= game.maxPlaytime && game.minPlaytime >= filters.playtime.minimum)) return;
            if (filters.yearPublished && !(filters.yearPublished.maximum >= game.yearPublished && game.yearPublished >= filters.yearPublished.minimum)) return;
            if (filters.complexity && !(filters.complexity.maximum >= game.complexityAverage && game.complexityAverage >= filters.complexity.minimum)) return;
            if (filters.rating && !(filters.rating.maximum >= game.ratingAverage && game.ratingAverage >= filters.rating.minimum)) return;
            if (filters.rank && !(filters.rank.maximum >= game.rank && game.rank >= filters.rank.minimum)) return;

            if (filters.genres?.length) {
                if (filters.genres.filter(genre => genre.state == "exclude").some(genre => game.genres.includes(genre.name))) return;
                if (!filters.genres.filter(genre => genre.state == "include").every(genre => game.genres.includes(genre.name))) return;
            }

            if (filters.mechanics?.length) {
                if (filters.mechanics.filter(mechanic => mechanic.state == "exclude").some(mechanic => game.mechanics.includes(mechanic.name))) return;
                if (!filters.mechanics.filter(mechanic => mechanic.state == "include").every(mechanic => game.mechanics.includes(mechanic.name))) return;
            }

            correctGames.push(game);
        });
        return correctGames;
    }
}
