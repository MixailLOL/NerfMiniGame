import GunDesc from '../system/gunsDescryption.js'

class GameEnd extends Phaser.Scene {
    constructor() {
      super("GameEnd");
    }

    init(data)
    {
        this.score = data.score;
        this.gun = data.gun;
    }

    create(){
        let background = this.add.image(0, 0 ,'bgStart').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.description = this.add.text(355, 30, "AWESOME! NOW CHECK OUT THE VIDEO", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '16pt'}).setOrigin(0, 0);
        this.scoreText = this.add.text(280, 250, "YOUR SCORE: ", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '18pt'}).setOrigin(1, 0);
        this.scoreScore = this.add.text(280, 270, ""+this.score, {color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '60pt'}).setOrigin(1, 0);

        this.gunImg = this.add.image(150, 185, this.gun).setOrigin(0.5, 0.5);

        var BigButnTextConfig={color:'#02132a',fontFamily: 'EuroStileBold', fontSize: '25pt'};
        this.buttonVisitNerf = this.add.text(800, 365, "VISIT NERF", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{window.location.href = 'https://brest.rabota.by/resume/47a09021ff0dfe3afe0039ed1f61657347574b'})
        .on('pointerout', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('GameEnd'); this.scene.start('Menu')})
        .on('pointerout', () => this.buttonGoBack.setStyle({ backgroundColor: '#09d1e1' }));


        let videoElem = '<div id="video"><video style="border: 4px solid #09d1e1;" controls autoplay width=485 height=265><source src="/assets/videos/video.mp4" type="video/mp4"></video></div>'
        let domElement2 = this.add.dom(0, 0).createFromHTML(videoElem).setOrigin(0, 0).setPosition(300,75);
    }

    update() {
    }
}

export default GameEnd