class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,animation){
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.play(animation);
    }
}