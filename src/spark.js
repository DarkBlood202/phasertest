class Spark extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,direction,speed,texture){
        super(scene,x,y,texture);
        scene.add.existing(this);

        // console.log("Spark created at " + direction + " direction!");

        let angle = Phaser.Math.DegToRad(-direction);
        this.xSpeed = speed * Math.cos(angle);
        this.ySpeed = speed * Math.sin(angle);
        this.x = x;
        this.y = y;

        scene.sparks.add(this);

        this.scene.time.addEvent({
            delay: 750,
            callback: function(){
                // console.log("Spark died at direction " + direction);
                this.destroy();
            },
            callbackScope: this,
            loop: false
        });
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}