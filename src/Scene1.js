class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        //LOADING BITMAP FONT
        this.load.bitmapFont("pixelFont","assets/fonts/font.png","assets/fonts/font.xml");

        // LOADING BACKGROUND IMAGE
        this.load.image("background","assets/img/background.png");

        /****** LOADING SPRITESHEETS ******/
        this.load.spritesheet("enemy_ship","assets/img/new/enemy_ship.png",{
            frameWidth: 128,
            frameHeight: 125
        });

        this.load.spritesheet("explosion","assets/img/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("powerup","assets/img/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("cabrera","assets/img/new/cabrera.png",{
            frameWidth: 109,
            frameHeight: 84
        });

        this.load.spritesheet("shots","assets/img/spritesheets/shots.png",{
            frameWidth: 12,
            frameHeight: 55
        });

        /**ADDING SOUND **/
        this.load.audio("snd_explosion",["assets/snd/explosion.ogg","assets/snd/explosion.mp3"]);
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");

        /****** START OF ANIMATION CREATION ******/
        this.anims.create({
            key: "enemy_idle",
            frames: this.anims.generateFrameNumbers("enemy_ship"),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 0,
                end: 1
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 2,
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("cabrera"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "shot",
            frames: this.anims.generateFrameNumbers("shots", {
                start: 0,
                end: 0
            }),
            frameRate:20,
            repeat: -1
        });
        
        /****** END OF ANIMATION CREATION ******/

    }
}