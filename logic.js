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
    };

    function calculateFinalPoints(statistics) {
        // console.log("weight.rating", weight.rating);
        console.log("statistics: ", statistics);

        // console.log("matchDay:", matchDay);
        const weightedResult =
            statistics.rating * weight.rating +
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
