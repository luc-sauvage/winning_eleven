function logic (playersInfos, matchDay) {
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
    }



    function calculateFinalPoints(statistics) {
        // console.log("weight.rating", weight.rating);
        // console.log("statistics: ", statistics);
        // console.log("matchDay:", matchDay);
        const weightedResult = (
            (statistics.games.rating * weight.rating) + 
            (statistics.goals.total / matchDay) * weight.averageGoals);
            console.log(
                "statistics.games.rating", statistics.games.rating, 
                "weight.rating", weight.rating, 
                "statistics.goals.total", statistics.goals.total,
                "matchDay", matchDay, 
                "weight.averageGoals", weight.averageGoals);
        return weightedResult;
    };



    const resultsArr = playersInfos.map((playerInfo, i) => {
        // console.log(stat.player);
        const finalPoints = calculateFinalPoints(playerInfo.statistics[0]);
        const resultObj = {
            ...playerInfo,
            totalPoints: finalPoints,
        }
        console.log(resultObj);
        return resultObj;


    })
    
    return(resultsArr); 

};

module.exports.logic = logic;