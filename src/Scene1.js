class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    init(data){
        this.playerTextureFile = data.playerTexture;
        this.playerCode = data.code;
    }

    preload(){

        // Load player texture
        if(this.playerCode == "cabrera"){
            // console.log("fue cabrera");
            this.load.spritesheet("player_texture",this.playerTextureFile,{
                frameWidth: 109,
                frameHeight: 84
            });
        }
        else if(this.playerCode == "escobegod"){
            // console.log("fue escobegod");
            this.load.spritesheet("player_texture",this.playerTextureFile,{
                frameWidth: 87,
                frameHeight: 85
            });
        }
        else if(this.playerCode == "smtoy"){
            // console.log("fue smtoy");
            this.load.spritesheet("player_texture",this.playerTextureFile,{
                frameWidth: 65,
                frameHeight: 80
            });
        }
        else if (!this.playerCode){
            // console.log("sin codigo");
            this.load.spritesheet("player_texture","assets/img/default.png",{
                frameWidth: 49,
                frameHeight: 80
            });
        }
        
        //LOADING BITMAP FONT
        this.load.bitmapFont("pixelFont","assets/fonts/font.png","assets/fonts/font.xml");

        // LOADING BACKGROUND IMAGE
        this.load.image("background","assets/img/background.png");

        // Load shot
        this.load.image("shot","assets/img/shot.png");

        // Load spark
        this.load.image("spark","assets/img/spark.png");

        /****** LOADING SPRITESHEETS ******/
        this.load.spritesheet("big_enemy","assets/img/bigEnemy.png",{
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.spritesheet("small_enemy","assets/img/smallEnemy.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("small_bullets","assets/img/smallBullets.png",{
            frameWidth: 15,
            frameHeight: 15
        });

        this.load.spritesheet("items","assets/img/items.png",{
            frameWidth: 8,
            frameHeight: 16
        });

        /**ADDING SOUND **/
        this.load.audio("snd_explosion",["assets/snd/explosion.ogg","assets/snd/explosion.mp3"]);
        this.load.audio("snd_pickup",["assets/snd/pickup.ogg","assets/snd/pickup.mp3"]);

        this.load.audio("bgm_game",["assets/snd/bgm_game.ogg","assets/snd/bgm_game.mp3"]);
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");

        /****** START OF ANIMATION/FRAMES CREATION ******/

        this.anims.create({
            key: "player_idle",
            frames: this.anims.generateFrameNumbers("player_texture"),
            frameRate: 10,
            repeat: -1
        });

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
        
        /****** END OF ANIMATION CREATION ******/

    }
}