var gameSettings = {
    playerSpeed: 200
};

var config = {
    width: 640,
    height: 480,
    backgroundColor: 0x000000,
    scene: [MainMenu,Scene1,Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

var game = new Phaser.Game(config);