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

    if (action.type === "SET_MATCHDAY") {
        state = {
            ...state,
            matchDay: action.matchDay,
        };
    }

    if (action.type === "SET_WINNING_TEAM") {
        state = {
            ...state,
            playerRanking: action.playerRanking,
        };
    }

    if (action.type === "SET_CURRENT_ROSTER") {
        state = {
            ...state,
            currentRoster: action.currentRoster,
        };
    }

    if (action.type === "SET_PLAYER_ROSTER") {
        state = {
            ...state,
            currentRoster: [...state.currentRoster, action.lastPlayerData],
        };
    }

    if (action.type === "SET_POPUP_STATE") {
        state = {
            ...state,
            popupState: action.popupState,
        };
    }
    if (action.type === "SET_POPUP_STATS") {
        state = {
            ...state,
            popupStats: action.popupStats,
        };
    }

    return state;
}
