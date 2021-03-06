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

export async function setMatchDay(matchDay) {
    try {
        return {
            type: "SET_MATCHDAY",
            matchDay,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setWinningTeam(data) {
    try {
        return {
            type: "SET_WINNING_TEAM",
            playerRanking: data,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setCurrentRoster(rosterData) {
    try {
        return {
            type: "SET_CURRENT_ROSTER",
            currentRoster: rosterData,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function addPlayerCurrentRoster(playerData) {
    console.log("playerData: ", playerData);
    try {
        return {
            type: "SET_PLAYER_ROSTER",
            lastPlayerData: playerData,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setPopupState(state) {
    try {
        return {
            type: "SET_POPUP_STATE",
            popupState: state,
        };
    } catch (error) {
        console.log("error", error);
    }
}

export async function setPopupStats(stats) {
    try {
        return {
            type: "SET_POPUP_STATS",
            popupStats: stats,
        };
    } catch (error) {
        console.log("error", error);
    }
}
