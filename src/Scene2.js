class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }
    
    create(){
        // creating the background as a tilesprite
        this.background = this.add.tileSprite(0,0,config.width,config.height,"background");
        // making the background's origin at 0,0 (topleft corner)
        this.background.setOrigin(0,0);

        this.player = this.physics.add.sprite(config.width/2,config.height*3/4,"player_texture");
        this.player.setCollideWorldBounds(true);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // creation of groups
        this.powerUps = this.physics.add.group();
        this.projectiles = this.add.group();
        this.enemies = this.physics.add.group();
        this.bullets = this.add.group();
        this.sparks = this.add.group();

        //Spawns enemy each x ms
        this.time.addEvent({
            delay: 2500,
            callback: function(){
                if(Math.random() > 0.5){
                    let enemy = new Enemy(
                        this,
                        Phaser.Math.Between(0,config.width),
                        0,
                        "big_enemy",
                        "bigEnemy_idle"
                    );
                    this.enemies.add(enemy);
                }
                else{
                    let enemy = new Enemy(
                        this,
                        Phaser.Math.Between(0,config.width),
                        0,
                        "small_enemy",
                        "smallEnemy_idle"
                    );
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        //NON PHYSICS COLLISION
        this.physics.add.overlap(this.player,this.powerUps,this.pickUpPowerUp,null,this);
        this.physics.add.overlap(this.player,this.enemies,this.hurtPlayer,null,this);
        this.physics.add.overlap(this.projectiles,this.enemies,this.hitEnemy,null,this);
        this.physics.add.overlap(this.player,this.bullets,this.hurtPlayer,null,this);

        // players's idle animation
        this.player.play("player_idle");

        //storing score value
        this.score = 0;
        this.power = 0;

        //adding rectangle of color
        var rectangle = this.add.graphics();
        rectangle.fillStyle("Black");
        rectangle.fillRect(0,0,config.width,20);
        
        //adding label with font
        let paddedScore = this.score.toString().padStart(10,"0");
        this.scoreLabel = this.add.bitmapText(10,5,"pixelFont","SCORE " + paddedScore,16);

        this.powerLabel = this.add.bitmapText(330,5,"pixelFont","POWER " + this.power,16);

        // creates the sound that will be used
        this.sndExplosion = this.sound.add("snd_explosion");
        this.sndPickUp = this.sound.add("snd_pickup");
        this.bgmGame = this.sound.add("bgm_game");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.bgmGame.play(musicConfig)

    }

    createExplosion(x,y){
        for(var i = 0; i < 360; i += 36){
            let spark = new Spark(this,x,y,i,1,"spark");
        }
    }

    pickUpPowerUp(player,powerUp){
        // console.log("Collision: Player and PowerUp!")
        this.sndPickUp.play();
        powerUp.disableBody(true,true);
        if(this.power < 128){
            this.power += 1;
            this.powerLabel.text = "POWER " + this.power;
        }
    }

    hurtPlayer(player,enemy){
        // console.log("Collision: Player and Enemy!");
        this.resetShip(enemy);
        if(this.player.alpha < 1){
            return;
        }
        this.createExplosion(this.player.x,this.player.y);
        this.sndExplosion.play();
        player.disableBody(true,true);
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            args: [config.width/2,config.height+128],
            loop: false
        });
    }

    hitEnemy(projectile,enemy){
        // console.log("Collision: Projecile and Enemy!");
        this.createExplosion(enemy.x,enemy.y);
        this.sndExplosion.play();
        projectile.destroy();
        this.resetShip(enemy);
        this.score += 15;
        let paddedScore = this.score.toString().padStart(10,"0");
        this.scoreLabel.text = "SCORE " + paddedScore;
    }

    moveShip(ship,speed){
        ship.y += speed;
        if(ship.y > config.height){
            this.resetShip(ship);
        }
    }

    resetShip(ship){
        ship.onDestroy();

        for (var i = 0; i < 5; i++){
            var powerUp = this.physics.add.sprite(16,16,"items");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(ship.x-20,ship.y-20,ship.x+20,ship.y+20);

            if(Math.random() > 0.5){
                powerUp.play("powerup");
            }
            else{
                powerUp.play("points");
            }

            powerUp.setVelocity(0,5);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }
        ship.destroy();
    }

    resetPlayer(xPos,yPos){
        this.player.enableBody(true,xPos,yPos,true,true);
        this.player.alpha = 0.5;

        let tween = this.tweens.add({
            targets: this.player,
            y: config.height - 128,
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    /********* GAME LOOP *********/
    update(){

        for(var i = 0; i < this.enemies.getChildren().length; i++){
            this.moveShip(this.enemies.getChildren()[i],Phaser.Math.Between(0.5,2.5));
        }

        for(var i = 0; i < this.sparks.getChildren().length; i++){
            var spk = this.sparks.getChildren()[i];
            spk.update();
        }

        for(var i = 0; i < this.bullets.getChildren().length; i++){
            var bul = this.bullets.getChildren()[i];
            bul.update();
        }

        this.background.tilePositionY -= 2.5;

        this.movePlayerManager();
        // if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            // this.shootBeam();
        // }

        if(this.spacebar.isDown){
            this.shootBeam();
        }

        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    movePlayerManager(){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if (this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }

    shootBeam(){
        if(this.player.active){
            if(this.power < 32){
                new Beam(this,this.player.x,this.player.y-50,"shot");
            }
            else if(this.power >= 32 && this.power < 64){
                new Beam(this,this.player.x+16,this.player.y-50,"shot");
                new Beam(this,this.player.x-16,this.player.y-50,"shot");
            }
            else if(this.power >= 64 && this.power < 96){
                new Beam(this,this.player.x-16,this.player.y-50,"shot");
                new Beam(this,this.player.x,this.player.y-50,"shot");
                new Beam(this,this.player.x+16,this.player.y-50,"shot");
            }
            else if(this.power >= 96 && this.power < 128){
                new Beam(this,this.player.x-13,this.player.y-50,"shot");
                new Beam(this,this.player.x-19,this.player.y-50,"shot");
                new Beam(this,this.player.x,this.player.y-50,"shot");
                new Beam(this,this.player.x+13,this.player.y-50,"shot");
                new Beam(this,this.player.x+19,this.player.y-50,"shot");
            }
            else if (this.power == 128){
                new Beam(this,this.player.x-25,this.player.y-50,"shot");
                new Beam(this,this.player.x-19,this.player.y-50,"shot");
                new Beam(this,this.player.x-13,this.player.y-50,"shot");
                new Beam(this,this.player.x,this.player.y-50,"shot");
                new Beam(this,this.player.x+13,this.player.y-50,"shot");
                new Beam(this,this.player.x+19,this.player.y-50,"shot");
                new Beam(this,this.player.x+25,this.player.y-50,"shot");
            }
        }
    }
}