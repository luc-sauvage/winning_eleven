export default function reducer(state = {}, action) {
    if (action.type === "SET_PLAYERS_PROFILES") {
        state = {
            ...state,
            playersData: action.playersData,
        };
    }

    if (action.type === "SET_SEARCH_RESULTS") {
        state = {
            ...state,
            searchResults: action.searchResults,
        };
    }

    if (action.type === "SET_LAST_CHOSEN_PLAYER") {
        state = {
            ...state,
            lastPlayer: action.lastPlayer,
        };
    }

    if (action.type === "SET_ROSTER_STATUS") {
        state = {
            ...state,
            rosterStatus: action.rosterStatus,
        };
    }

    return state;
}
