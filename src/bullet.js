class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,direction,speed,texture,animation){
        super(scene,x,y,texture);
        this.play(animation);

        scene.add.existing(this);
        // console.log("Bullet created!")

        let angle = Phaser.Math.DegToRad(-direction);
        // console.log(direction);
        // console.log(angle);
        
        this.xSpeed = speed * Math.cos(angle);
        this.ySpeed = speed * Math.sin(angle);

        this.x = x;
        this.y = y;

        scene.bullets.add(this);
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < -128 || this.x > config.width + 128){
            this.destroy();
        }
        if(this.y < -128 || this.y > config.height + 128){
            this.destroy();
        }
    }
}