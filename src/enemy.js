class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,animation){
        super(scene,x,y,texture);
        this.play(animation);

        scene.add.existing(this);
        // console.log("Enemy created!")

        //Spawns bullet each x ms
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function(){
                var dx = this.scene.player.x - this.x;
                var dy = this.scene.player.y - this.y;

                var radAngle = Math.atan2(dy,dx);
                // console.log("radAngle:" + radAngle);
                
                var degAngle = -(Phaser.Math.RadToDeg(radAngle))
                // console.log("degAngle:" + degAngle);

                var speed = 5
                var bullet = new Bullet(this.scene,this.x,this.y,degAngle,speed,"small_bullets","TargetBullet_sW");
                this.scene.bullets.add(bullet);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy(){
        // console.log("Method onDestroy called!")
        if(this.shootTimer !== undefined){
            if(this.shootTimer){
                this.shootTimer.remove(false);
            }
        }
    }
}