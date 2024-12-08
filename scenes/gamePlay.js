class GamePlay extends Phaser.Scene {
    constructor() {
      super("GamePlay");
    }
    create(){
        this.claimedPoints = 0;
        this.targets ={}
        this.iniTime = Math.floor(this.game.loop.time/1000);
        this.time = 0;
        let background = this.add.image(0, 0 ,'bg').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(275, 30, "tap the targets to shoot as many as you can within the time limit!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '20pt'}).setOrigin(0, 0);
        this.timeText = this.add.text(664, 30, "time:", {color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '16.78pt'}).setOrigin(0, 0);
        this.scoreText = this.add.text(664, 50, "score:", {color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '23.49pt'}).setOrigin(0, 0);
    }

    update(delta) {
        this.time = this.iniTime+20-Math.floor(delta/1000);
        this.updateTime();
    }

    updateTime(){
         this.timeText.setText('time:'+this.time+' secs');
         this.scoreText.setText('score: '+this.claimedPoints);
         if(this.time==0){
            this.scene.stop('GamePlay'); 
            this.scene.start('GameEnd');
         }
         this.spawnTarget();
         for(let i in this.targets){
            this.targets[i][0].scale *=0.995;
            this.targets[i][1].setStyle({ fontSize: this.targets[i][1].style.fontSize.split(''+this.targets[i][1].style.fontSize.slice(-2))[0]*0.995+'pt'})
         }
    }

    spawnTarget(){
        let targetPosW = Phaser.Math.Between(80, 720);
        let targetPosH = Phaser.Math.Between(110, 340);
        if(Phaser.Math.Between(1,50) == 10){
            let points = Phaser.Math.Between(1,20)*10;
            let name = points+'target'+Phaser.Math.Between(1,99999);
            if(points>100){
                this.target = this.add.image(targetPosW,targetPosH,'targetBig').setOrigin(0.5,0.5).setScale(Phaser.Math.Between(1.0, 1.3))
                .setInteractive()
                .setName(name)
                .on('pointerdown', ()=>{this.claimedPoints += Number((name.split('target'))[0]);this.targets[name][1].destroy();this.targets[name][0].destroy();delete this.targets[name]});
                this.targetText = this.add.text(targetPosW,targetPosH, ''+points, {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '17.36pt'})
                .setOrigin(0.5, 0.5);
            }else{
                this.target = this.add.image(targetPosW,targetPosH,'targetSmall').setOrigin(0.5,0.5).setScale(Phaser.Math.Between(1.0, 1.3))
                .setInteractive()
                .setName(name)
                .on('pointerdown', ()=>{this.claimedPoints += Number((name.split('target'))[0]);this.targets[name][1].destroy();this.targets[name][0].destroy();delete this.targets[name]});
                this.targetText = this.add.text(targetPosW,targetPosH, ''+points, {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '17.36pt'})
                .setOrigin(0.5, 0.5);
            }
            this.targets[this.target.name] = [this.target,this.targetText];    
        }
    }
}

export default GamePlay