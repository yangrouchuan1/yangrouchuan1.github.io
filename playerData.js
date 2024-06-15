let playerData = {
    levels: []
};

function initializePlayerData(levelCount) {
    for (let i = 0; i < levelCount; i++) {
        playerData.levels.push({
            highScore: null,
            highMoney: null
        });
    }
}

function updatePlayerData(levelIndex, score) {
    //if (score > playerData.levels[levelIndex].highScore) {
        playerData.levels[levelIndex].highScore = score;
        playerData.levels[levelIndex].highMoney = moneyEarned - monthlyRent;//获取当日最高收益
    //}
}

function getTotalMoney() {
    return playerData.levels.reduce((total, level) => total + level.highMoney, 0);
}
