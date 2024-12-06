import BgList from '../system/bgList.js'
import Player from '../player/player.js'

class GamePlay extends Phaser.Scene {
    constructor() {
      super("GamePlay");
      this.worldTailsAmout = 5;
      this.player;
      this.activePointer;
      this.bgList = BgList;
    }

    create ()
    {
        this.scene.launch('GameOver');
        this.scene.sleep('GameOver');
        this.currentBG = this.bgList[Math.floor(Math.random() * this.bgList.length)];
        this.shapes = this.cache.json.get('shapes');
        let background = this.add.image(0, window.innerHeight*2 ,''+this.currentBG[0]).setName("Background");
        background.displayWidth = window.innerWidth*3;
        background.displayHeight = window.innerHeight;
        background.setOrigin(0, 0);
        background.depth = -3;
        this.isSpawnStart = false;
        this.firstPress = false;
        this.halfWalls = 0;
        this.worldStart = 0;
        this.wallId = 0;
        this.lastWallsSize = [[0,0]];
        this.minDim = Math.min(window.innerHeight, window.innerWidth);
        this.pSpriteWH;
        var textConfig={fontSize:'60px',color:'#ff0000',fontFamily: 'Arial'};
        this.points = this.add.text( window.innerWidth*0.1, window.innerHeight*0.05,"-1", textConfig).setName("Scoretext");
        this.fpsText = this.add.text(window.innerWidth*0.2,window.innerHeight*0.05,"fps", textConfig).setName("FPSText");
        this.objectsOnSceneText = this.add.text(window.innerWidth*0.5,window.innerHeight*0.05,""+this.scene.scene.children.list.length, textConfig).setName("objectsOnSceneText");
        this.points.setText("0");
        this.hud = this.add.container(0, 0, [this.points, this.fpsText, this.objectsOnSceneText]).setScrollFactor(0);
        this.hud.depth = 1;
        this.player =  new Player(this, window.innerWidth, window.innerHeight*(this.worldTailsAmout/2));
        this.physics.world.setBounds(0, 0, window.innerWidth*this.worldTailsAmout*2, window.innerHeight*this.worldTailsAmout);
        let camera = this.cameras.main;
        //camera.zoom = 0.2;
        //camera.setOrigin(0, 0);
        camera.startFollow(this.player.sprite).setBounds(0,window.innerHeight*2, window.innerWidth*this.worldTailsAmout, window.innerHeight);
        camera.setOrigin(0.3, 0.5)
        this.input.on('pointerdown', (pointer)=>{
            if(pointer.y > window.innerHeight/4){
                this.activePointer = pointer;
            }
        });  
    }

    pointerCheck(pointer){
        if(pointer.isDown){
            this.player.up();
        }else{
            this.activePointer = null;
        }
    }

    update (time)
    {
        this.objectsOnSceneText.setText(this.scene.scene.children.list.length+" Obj");
        this.fpsText.setText(Math.round(this.game.loop.actualFps) + " fps");
        this.player.update(time);
        if(this.activePointer){
            this.pointerCheck(this.activePointer);    
        }else if(this.firstPress){
            this.player.down();
        }
        //this.points.setText("0");
        
    }
}
export default GamePlay