class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }
    create(){

        let background = this.add.image(0, 0 ,'bgStart').setName("Background");
        background.setOrigin(0, 0);
        background.depth = -3;

        let logo = this.add.image(27, 28 ,'logo').setName("logo");
        logo.setOrigin(0, 0);
        logo.depth = -2;

        let guns = this.add.image(35, 118 ,'menuGuns').setName("menuGuns");
        guns.setOrigin(0, 0);
        guns.depth = -2;

        var textConfig={color:'#02132a',fontFamily: 'EurostileBold', fontSize: '28pt'};

        this.buttonPlay = this.add.text(0, 300, "PLAY MINIGAME", textConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1' })
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonPlay.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('Menu'); this.scene.start('GamePlay')})
        .on('pointerout', () => this.buttonPlay.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonViewRange = this.add.text(0, 365, "VIEW RANGE", textConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonViewRange.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('Menu'); this.scene.start('ViewRange')})
        .on('pointerout', () => this.buttonViewRange.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonWatchVideo = this.add.text(800, 300, "WATCH VIDEO", textConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1' })
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonWatchVideo.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.showVideo()})
        .on('pointerout', () => this.buttonWatchVideo.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonVisitNerf = this.add.text(800, 365, "VISIT NERF", textConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('Menu'); this.scene.start('GamePlay')})
        .on('pointerout', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#09d1e1' }));

        this.textDescription = this.add.text(425, 50, "choose your blaster then shoot as many\ntargets as you can within the time limit!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '15.94pt'}).setOrigin(0, 0);
    }

    showVideo (){
        let shadow = '<div style="width: 800px; height: 3450px; background-color: #000000; opacity:0.7" id="shadow"></div>'
        let domElement3 = this.add.dom(0, 0).createFromHTML(shadow).setOrigin(0, 0).setPosition(0,0);
        let videoBorder = '<div style="width: 640px; height: 360px; background-color: #09d1e1;" id="border"></div>'
        let domElement = this.add.dom(0, 0).createFromHTML(videoBorder).setOrigin(0, 0).setPosition(85,55);
        let videoElem = '<div id="video"><video controls width=630 height=350><source src="/assets/videos/video.mp4" type="video/mp4"></video></div>'
        let domElement2 = this.add.dom(0, 0).createFromHTML(videoElem).setOrigin(0, 0).setPosition(90,60);
        let closeVidBtn = '<img src="assets/closeEclips.png" alt="Close Button" id="btmCloseVid">'
        let domElement4 = this.add.dom(0, 0).createFromHTML(closeVidBtn).setOrigin(0, 0).setPosition(676,65);
        document.getElementById("btmCloseVid").onclick = function () {
           document.getElementById("shadow").remove()
           document.getElementById("border").remove()
           document.getElementById("video").remove()
           document.getElementById("btmCloseVid").remove()
        };
    }
}

export default Menu

//browser-sync start --server --files "."