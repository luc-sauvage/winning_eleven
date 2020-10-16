export async function setPlayersProfiles(playersData) {
    try {
        return {
            type: "SET_PLAYERS_PROFILES",
            playersData: playersData,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setSearchResults(value) {
    try {
        return {
            type: "SET_SEARCH_RESULTS",
            searchResults: value,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setLastAddedPlayer(lastPlayerData) {
    try {
        return {
            type: "SET_LAST_CHOSEN_PLAYER",
            lastPlayer: lastPlayerData,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setFullRoster(rosterStatus) {
    try {
        return {
            type: "SET_ROSTER_STATUS",
            rosterStatus: rosterStatus,
        };
    } catch (error) {
        console.log("error", error);
    }
}
