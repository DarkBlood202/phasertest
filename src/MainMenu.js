class MainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenu");
    }

    preload(){
        this.load.image("mainTitle","assets/gui/main_title.png");
        this.load.image("btnStart","assets/gui/btn_start.png");
        this.load.image("btnCode","assets/gui/btn_code.png");

        this.load.audio("bgm_title",["assets/snd/bgm_title.ogg","assets/snd/bgm_title.mp3"]);
        this.load.audio("snd_select",["assets/snd/select.ogg","assets/snd/select.mp3"]);
    }

    create(){
        this.background = this.add.image(0,0,"mainTitle");
        this.background.setOrigin(0,0);

        this.bgmTitle = this.sound.add("bgm_title");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.bgmTitle.play(musicConfig)

        this.sndButton = this.sound.add("snd_select");

        /* START BUTTON */
        this.btnStart = this.add.sprite(config.width/4,config.height/2,"btnStart");
        this.btnStart.setInteractive();

        this.btnStart.on("pointerdown",function(){
            this.sndButton.play();
        },this);

        this.btnStart.on("pointerup",function(){
            this.bgmTitle.stop();
            this.scene.start("bootGame");
        },this);

         /* CODE BUTTON */
        this.btnCode = this.add.sprite(config.width/4, config.height/2 + 39, "btnCode");
        this.btnCode.setInteractive();

        this.code;

        this.btnCode.on("pointerdown",function(){
            this.sndButton.play();
        },this);

        this.btnCode.on("pointerup",function(){
            var code = prompt("SmToy code: ", "XXX-XXXX");
            if(code == null || code == ""){
                window.alert("NO CODE");
            }
            else if (code == "KVB-RERV"){
                window.alert("¡ATENTO A LA JUGADA!");
                this.code = "cabrera";
                this.bgmTitle.stop();
                this.scene.start("bootGame",{
                    code: this.code,
                    playerTexture: "assets/img/cabrera.png"
                });
            }
            else if (code == "3SC-0BD0"){
                window.alert("CHICOS, MI ENCUESTA POR FAVOR");
                this.code = "escobegod";
                this.bgmTitle.stop();
                this.scene.start("bootGame",{
                    code: this.code,
                    playerTexture: "assets/img/escobegod.png"
                });
            }
            else if (code == "XV1-00LL"){
                window.alert("CODE ACCEPTED!");
                this.code = "smtoy";
                this.bgmTitle.stop();
                this.scene.start("bootGame",{
                    code: this.code,
                    playerTexture: "assets/img/smtoy.png"
                });
            }
            else{
                window.alert("ERROR.");
            }
        },this);
    }
}