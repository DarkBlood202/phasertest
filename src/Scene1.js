class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background","assets/img/background.png");

        this.load.spritesheet("ship1","assets/img/spritesheets/ship1.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2","assets/img/spritesheets/ship2.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3","assets/img/spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion","assets/img/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("powerup","assets/img/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("gi","assets/img/singles/spr_gi.png");

        this.load.spritesheet("shots","assets/img/spritesheets/shots.png",{
            frameWidth: 12,
            frameHeight: 55
        });

    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");

        /****** START OF ANIMATION CREATION ******/
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship1"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
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