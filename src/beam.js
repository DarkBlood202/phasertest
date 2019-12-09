class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene,xpos,ypos,texture){

        super(scene,xpos,ypos,texture);

        scene.add.existing(this);

        this.play("shot");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -750;

        scene.projectiles.add(this);
    }

    update(){
        if(this.y < -55){
            this.destroy();
        }
    }
}