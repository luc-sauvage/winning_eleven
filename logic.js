function logic (stats) {
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

    const resultsArr = stats.map((stat, i) => {
        console.log(stat.player);
        const resultObj = {
            playerId: stat.player.id,

        }
        console.log(resultObj);
        return resultObj;


    })
    
    return(resultsArr); 

};

module.exports.logic = logic;