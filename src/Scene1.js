class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        //LOADING BITMAP FONT
        this.load.bitmapFont("pixelFont","assets/fonts/font.png","assets/fonts/font.xml");

        // LOADING BACKGROUND IMAGE
        this.load.image("background","assets/img/new/background.png");

        // Load shot
        this.load.image("shot","assets/img/new/shot.png");

        // Load spark
        this.load.image("spark","assets/img/new/spark.png");

        /****** LOADING SPRITESHEETS ******/
        this.load.spritesheet("big_enemy","assets/img/new/bigEnemy.png",{
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet("small_enemy","assets/img/new/smallEnemy.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("small_bullets","assets/img/new/smallBullets.png",{
            frameWidth: 15,
            frameHeight: 15
        });

        this.load.spritesheet("big_bullets","assets/img/new/bigBullets.png",{
            frameWidth: 31,
            frameHeight: 31
        });

        this.load.spritesheet("items","assets/img/new/items.png",{
            frameWidth: 8,
            frameHeight: 16
        });

        this.load.spritesheet("cabrera","assets/img/new/cabrera.png",{
            frameWidth: 109,
            frameHeight: 84
        });

        /**ADDING SOUND **/
        this.load.audio("snd_explosion",["assets/snd/explosion.ogg","assets/snd/explosion.mp3"]);
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");

        /****** START OF ANIMATION/FRAMES CREATION ******/
        this.anims.create({
            key: "bigEnemy_idle",
            frames: this.anims.generateFrameNumbers("big_enemy"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "smallEnemy_idle",
            frames: this.anims.generateFrameNumbers("small_enemy"),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: "TargetBullet_sW",
            frames: this.anims.generateFrameNumbers("small_bullets",{
                start: 0,
                end: 0
            }),
            frameRate: 0,
            repeat: 0
        });
        
        this.anims.create({
            key: "Bullet_sW",
            frames: this.anims.generateFrameNumbers("small_bullets",{
                start: 1,
                end: 1
            }),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "TargetBullet_sB",
            frames: this.anims.generateFrameNumbers("small_bullets",{
                start: 2,
                end: 2
            }),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "Bullet_sB",
            frames: this.anims.generateFrameNumbers("small_bullets",{
                start: 3,
                end: 3
            }),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "powerup",
            frames: this.anims.generateFrameNumbers("items", {
                start: 0,
                end: 0
            }),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "points",
            frames: this.anims.generateFrameNumbers("items", {
                start: 1,
                end: 1
            }),
            frameRate: 0,
            repeat: 0
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("cabrera"),
            frameRate: 10,
            repeat: -1
        });
        
        /****** END OF ANIMATION CREATION ******/

    }
}