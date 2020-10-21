function logic(playersInfos, matchDay) {
    // console.log("stats", stats);

    const weight = {
        rating: 1,
        averageGoals: 9,
        averageAssists: 3,
        averageDribblings: 1,
        averageYellowCards: -1.5,
        averageRedCards: -3,
        lineupLikelyhood: 1.5,
        averageMissedPenalties: -9,
        averageConcededGoals: -3,
        averageSavedPenalties: 10,
        averageSaves: 1.5,
        averageCommittedPenalties: -5,
    };



    function calculateFinalPoints(statistics) {
        // console.log("weight.rating", weight.rating);
        console.log("statistics: ", statistics);

        let weightedResult;

        if (statistics.position === "Goalkeeper") {
            weightedResult = 
            statistics.rating * weight.rating +
            statistics.conceded_goals / statistics.match_day * weight.averageConcededGoals +
            statistics.yellow_cards / statistics.match_day *
                weight.averageYellowCards + 
            (statistics.red_cards / statistics.match_day) *
                weight.averageRedCards +
            (statistics.lineups / statistics.match_day) *
                weight.lineupLikelyhood +
            statistics.saved_penalties / statistics.match_day * weight.averageSavedPenalties +
            statistics.saves / statistics.match_day * weight.averageSaves +
            statistics.commited_penalties / statistics.match_day * weight.averageCommittedPenalties;
        } 
        else if  (statistics.position === "Defender") {
             weightedResult = statistics.rating * weight.rating +
            (statistics.total_goals / statistics.match_day) *
                weight.averageGoals +
            (statistics.assists / statistics.match_day) *
                weight.averageAssists +
            ((statistics.success_dribbles / statistics.attempted_dribbles) *
                weight.averageDribblings || 0) +
            (statistics.yellow_cards / statistics.match_day) *
                weight.averageYellowCards +
            (statistics.red_cards / statistics.match_day) *
                weight.averageRedCards +
            (statistics.lineups / statistics.match_day) *
                weight.lineupLikelyhood +
            (statistics.missed_penalties / statistics.appearences) *
                weight.averageMissedPenalties;
        }

        else if  (statistics.position === "Midfielder") {
             weightedResult =  statistics.rating * weight.rating +
            (statistics.total_goals / statistics.match_day) *
                weight.averageGoals +
            (statistics.assists / statistics.match_day) *
                weight.averageAssists +
            ((statistics.success_dribbles / statistics.attempted_dribbles) *
                weight.averageDribblings || 0) +
            (statistics.yellow_cards / statistics.match_day) *
                weight.averageYellowCards +
            (statistics.red_cards / statistics.match_day) *
                weight.averageRedCards +
            (statistics.lineups / statistics.match_day) *
                weight.lineupLikelyhood +
            (statistics.missed_penalties / statistics.appearences) *
                weight.averageMissedPenalties;
        }

        else {
             weightedResult =  statistics.rating * weight.rating +
            (statistics.total_goals / statistics.match_day) *
                weight.averageGoals +
            (statistics.assists / statistics.match_day) *
                weight.averageAssists +
            ((statistics.success_dribbles / statistics.attempted_dribbles) *
                weight.averageDribblings || 0) +
            (statistics.yellow_cards / statistics.match_day) *
                weight.averageYellowCards +
            (statistics.red_cards / statistics.match_day) *
                weight.averageRedCards +
            (statistics.lineups / statistics.match_day) *
                weight.lineupLikelyhood +
            (statistics.missed_penalties / statistics.appearences) *
                weight.averageMissedPenalties;
        }

        console.log("weightedResult: ", weightedResult);
        return weightedResult;
    }

    // qui da verificare! perché non arriva più un json ma un array di oggetti ad un livello
    const resultsArr = playersInfos.map((playerInfo, i) => {
        // console.log(stat.player);
        const finalPoints = calculateFinalPoints(playerInfo);
        const resultObj = {
            ...playerInfo,
            totalPoints: finalPoints,
        };

        console.log("results after adding RANKING POINTS ", resultObj);
        return resultObj;
    });

    return resultsArr;
}

module.exports.logic = logic;
