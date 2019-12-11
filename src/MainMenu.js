class MainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenu");
    }
    create(){
        this.scene.start("bootGame");
    }
}