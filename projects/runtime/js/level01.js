var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "sawblade", "x": 1500, "y": groundY },
                { "type": "sawblade", "x": 1700, "y": groundY },
                { "type": "sawblade", "x": 2000, "y": groundY },
                { "type": "sawblade", "x": 2500, "y": groundY },
            ],
            "gameItems2": [
                { "type": "pit", "x": 2250, "y": groundY },
                { "type": "pit", "x": 3250, "y": groundY }
            ],
            "gameItems3": [
                { "type": "enemy", "x": 1500, "y": groundY - 100},
                { "type": "enemy", "x": 2000, "y": groundY - 100},
                { "type": "enemy", "x": 2500, "y": groundY - 100},
                { "type": "enemy", "x": 3000, "y": groundY - 100},
                { "type": "enemy", "x": 3500, "y": groundY - 50},
                { "type": "enemy", "x": 3750, "y": groundY - 100},
                { "type": "enemy", "x": 4000, "y": groundY - 100},
                { "type": "enemy", "x": 4250, "y": groundY - 100},
            ],
            "gameItems4": [
                { "type": "reward", "x": 1700, "y": groundY - 150},
                { "type": "reward", "x": 2700, "y": groundY - 150},
                { "type": "reward", "x": 3700, "y": groundY - 150},
                { "type": "reward", "x": 4700, "y": groundY - 150},
            ],
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        var firstGameItemObject = levelData.gameItems[0];
        var firstX = firstGameItemObject.x;
        var firstY = firstGameItemObject.y;
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var eachElement = levelData.gameItems[i];
            createSawBlade(eachElement.x, eachElement.y);
        }
        for (var i = 0; i < levelData.gameItems2.length; i++) {
            var eachElement2 = levelData.gameItems2[i];
            createPit(eachElement2.x, eachElement2.y);
        }
        for (var i = 0; i < levelData.gameItems3.length; i++) {
            var eachElement3 = levelData.gameItems3[i];
            createEnemy(eachElement3.x, eachElement3.y);
        }
        for (var i = 0; i < levelData.gameItems4.length; i++) {
            var eachElement4 = levelData.gameItems4[i];
            createReward(eachElement4.x, eachElement4.y);
        }
            function createSawBlade(x,y){
                var hitZoneSize = 25;
                var damageFromObstacle = 10;
                var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                    sawBladeHitZone.x = x;
                    var place = Math.random();
                    if (place < 0.5){
                        sawBladeHitZone.y = groundY;
                    }
                    else if (place >= 0.5){
                        sawBladeHitZone.y = groundY - 105;
                    }
                    game.addGameItem(sawBladeHitZone);
                var obstacleImage = draw.bitmap('img/sawblade.png');
                    sawBladeHitZone.addChild(obstacleImage);
                    obstacleImage.x = -25;
                    obstacleImage.y = -25;
            }
            function createPit(x,y) {
                var hitZoneSize2 = 25;
                var damageFromPit = 100;
                var pitHitZone = game.createObstacle(hitZoneSize2, damageFromPit);
                    pitHitZone.x = x;
                    pitHitZone.y = groundY;
                    game.addGameItem(pitHitZone);
                var obstacleImage2 = draw.bitmap('img/demon-furby.jpg');
                    pitHitZone.addChild(obstacleImage2);
                    obstacleImage2.xscaleX = 10;
                    obstacleImage2.yscaleY = 10;
            };
            function createEnemy (x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/enemy.jpg');
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);
                enemy.x = x;
                enemy.y = groundY-50;
                game.addGameItem(enemy);
                enemy.velocityX = -3;
                enemy.rotationalVelocity = 0;
                enemy.onPlayerCollision = function() {
                    game.changeIntegrity(-15);
                }
                enemy.onProjectileCollision = function() {
                      game.increaseScore(100);
                      enemy.fadeOut();
                    }
            };
            function createReward (x,y) {
            var reward = game.createGameItem('reward',25);
            var greenSquare = draw.bitmap('img/honeyBun.jpg');
                greenSquare.x = -25;
                greenSquare.y = -25;
                reward.addChild(greenSquare);
                reward.x = x;
                reward.y = groundY-50;
                game.addGameItem(reward);
                reward.velocityX = -2;
                reward.onPlayerCollision = function() {
                    game.changeIntegrity(+10);
                    game.increaseScore(50);
                    reward.fadeOut();
                }
            }
        // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
