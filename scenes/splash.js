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

        this.load.image('bg', 'assets/backgrounds/bg.png');
        this.load.image('bgStart', 'assets/backgrounds/bgStart.png');
        this.load.image('viewRangeBg', 'assets/backgrounds/viewRangeBg.png');
        this.load.image('logoSmall', 'assets/logoSmall.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('menuGuns', 'assets/menuGuns.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('arrowO', 'assets/arrowO.png');
        this.load.image('gunCommander', 'assets/guns/commander.png');
        this.load.image('gunShockwave', 'assets/guns/shockwave.png');
        this.load.image('gunEcho', 'assets/guns/echo.png');
        this.load.image('gunVolt', 'assets/guns/volt.png');
        this.load.image('gunCommanderBig', 'assets/guns/commanderBig.png');
        this.load.image('gunShockwaveBig', 'assets/guns/shockwaveBig.png');
        this.load.image('gunEchoBig', 'assets/guns/echoBig.png');
        this.load.image('gunVoltBig', 'assets/guns/voltBig.png');
        this.load.image('targetBig', 'assets/targetBig.png');
        this.load.image('targetSmall', 'assets/targetSmall.png');
        this.load.image('beams', 'assets/beams.png');
        
    }

    create ()
    {
        this.scene.stop('Splash'); 
        this.scene.start('Menu');       
    }
}

export default Splash