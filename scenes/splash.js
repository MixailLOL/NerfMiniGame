import BgList from '../system/bgList.js'
import AchivList from '../system/achivList.js'

class Splash extends Phaser.Scene {
    init(data)
    {
        this.initData = data;
    }
    constructor() {
      super("Splash");
    }
    preload ()
    {
        const progress = this.add.graphics();
        this.load.on('progress', value =>
        {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800*value, 60);
        });

        this.load.on('complete', () =>
        {
            progress.destroy();
        });

        if(this.initData.achiv){
            AchivList.forEach((item) => {
                this.load.image('Achivm'+item, 'assets/achievements/'+item+'.jpg');
            });
        }
        else{
            this.load.image('bg', 'assets/backgrounds/bg.png');
            this.load.image('bgStart', 'assets/backgrounds/bgStart.png');
            this.load.image('viewRangeBg', 'assets/backgrounds/viewRangeBg.png');
            this.load.image('logoSmall', 'assets/logoSmall.png');
            this.load.image('logo', 'assets/logo.png');
            this.load.image('menuGuns', 'assets/menuGuns.png');
            this.load.image('arrow', 'assets/arrow.png');
            this.load.image('gunCommander', 'assets/guns/commander.png');
            this.load.image('gunShockwave', 'assets/guns/shockwave.png');
            this.load.image('gunEcho', 'assets/guns/echo.png');
            this.load.image('gunVolt', 'assets/guns/volt.png');

            this.load.atlas('player', 'assets/player/player.png','assets/player/playerAtlas.json' );
            this.load.image('portalBack', 'assets/objects/portalBack.png');
            this.load.image('portalFront', 'assets/objects/portalFront.png');
            this.load.image('objWhite', 'assets/objects/objWhite.png');
            this.load.image('invis', 'assets/objects/invis.png');
            this.load.json('shapes', 'assets/player/player.json');

            BgList.forEach((item) => {
                this.load.image(''+item[0], 'assets/backgrounds/'+item[0]+'/'+item[0]+'.jpg');
                this.load.image('wall'+item[0], 'assets/backgrounds/'+item[0]+'/wall.png');
                item[1].forEach((item2)=>{
                    this.load.image(''+item[0]+item2, 'assets/backgrounds/'+item[0]+'/'+item2+'.png');
                })
            });    
        }
    }

    create ()
    {
        if(!this.initData.achiv){
            this.scene.stop('Splash'); 
            this.scene.start('Menu');    
        }else{
            this.scene.stop('Splash'); 
            this.scene.start('Achivments');    
        }
        
    }
}

export default Splash