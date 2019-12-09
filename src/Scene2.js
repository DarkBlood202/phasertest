class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        // creating the background as a tilesprite
        this.background = this.add.tileSprite(0,0,config.width,config.height,"background");
        // making the background's origin at 0,0 (topleft corner)
        this.background.setOrigin(0,0);

        this.player = this.physics.add.sprite(config.width/2,config.height*3/4,"gi");
        this.player.setCollideWorldBounds(true);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        

        // creates 3 sprites (ship) and places them in the coords with the graphics
        this.ship1 = this.add.sprite(config.width/2 - 50,config.height/2,"ship1");
        this.ship2 = this.add.sprite(config.width/2,config.height/2,"ship2");
        this.ship3 = this.add.sprite(config.width/2 + 50,config.height/2,"ship3");


        // creation of groups
        this.powerUps = this.physics.add.group();
        this.projectiles = this.add.group();

        // adding 10 pups
        var maxObjects = 10;
        for (var i = 0; i < maxObjects; i++){
            var powerUp = this.physics.add.sprite(16,16,"powerup");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0,0,game.config.width,game.config.height);

            if(Math.random() > 0.5){
                powerUp.play("red");
            }
            else{
                powerUp.play("gray");
            }

            powerUp.setVelocity(100,100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.physics.add.collider(this.projectiles,this.powerUps,function(projectile,powerUp){
            projectile.destroy();
        });

        this.physics.add.ovelap(this.player,this.powerUps,this.pickUpPowerUp,null,this);

        // assign the animation to play on the objects
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        // making the objects interactive
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        // when clicking an object, call the function of that object
        this.input.on("gameobjectdown",this.destroyShip,this);

        // show text on screen
        this.add.text(20,20,"Playing game",{
            font:"25px Helvetica",
            fill:"yellow"
        });
    }

    pickUpPowerUp(player,powerUp){
        powerUp.disableBody(true,true);
    }

    moveShip(ship,speed){
        ship.y += speed;
        if(ship.y > config.height){
            this.resetShip(ship);
        }
    }

    resetShip(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(0,config.width);
        ship.x = randomX;
    }

    destroyShip(pointer,gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    /********* GAME LOOP *********/
    update(){
        this.moveShip(this.ship1,1);
        this.moveShip(this.ship2,2);
        this.moveShip(this.ship3,3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
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
        // var beam = new Beam(this,this.player.x-16,this.player.y,"shots");
        new Beam(this,this.player.x-16,this.player.y,"shots");
        new Beam(this,this.player.x+16,this.player.y,"shots");
    }

}