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
        averageFouls: -0.3,
        averageTackles: 0.7,
        averageInterceptions: 1,
        wonDuelsRate: 2, 
        averagePasses: 0.05,
        averageKeyPasses: 1,
        averageDrawnFouls: 0.3,
        averageWonPenalties: 1,
    };

    function commonLogic (statistics) {
        return statistics.rating * weight.rating +
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
        ((statistics.missed_penalties + statistics.scored_penalties) > 0 ? (statistics.missed_penalties / (statistics.missed_penalties + statistics.scored_penalties)) * weight.averageMissedPenalties : 0) +
        statistics.total_interceptions / statistics.match_day * weight.averageInterceptions + 
        ((statistics.won_duels / statistics.total_duels) * weight.wonDuelsRate) || 0 +
        statistics.key_passes / statistics.match_day * weight.averageKeyPasses +
        statistics.drawn_fouls / statistics.match_day * weight.averageDrawnFouls +
        statistics.commited_penalties / statistics.match_day * weight.averageCommittedPenalties + 
        statistics.won_penalties / statistics.match_day * weight.averageWonPenalties;
    }

    

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
             weightedResult = commonLogic(statistics) + 
             statistics.committed_fouls / statistics.match_day * weight.averageFouls +
             statistics.total_tackles / statistics.match_day * weight.averageTackles;
        }

        else if  (statistics.position === "Midfielder") {
             weightedResult =  commonLogic(statistics) + 
             statistics.committed_fouls / statistics.match_day * weight.averageFouls + 
             statistics.total_tackles / statistics.match_day * weight.averageTackles + 
             statistics.total_passes / statistics.match_day * weight.averagePasses ;
        }

        else {
             weightedResult =  commonLogic(statistics);
        }

        /* console.log("weightedResult: ", weightedResult); */
        console.log("!!!!!!!!!!!!!! statistics.missed_penalties", statistics.missed_penalties) ;
        console.log("!!!!!!!!!!!!!! statistics.scored_penalties", statistics.scored_penalties) ;
        console.log("!!!!!!!!!!!!!!", (statistics.missed_penalties / (statistics.missed_penalties + statistics.scored_penalties)) * weight.averageMissedPenalties || 0) ;
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
