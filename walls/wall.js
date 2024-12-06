var Wall = new Phaser.Class({
        initialize:
        function Wall (scene, x, yTop, yBot, id, zazor)
        {
            let player;
            this.game = scene;
            for (let index = 0; index < this.game.children.list.length; index++) {
                let object = this.game.children.list[index];
                if(object.name == 'PlayerSprite'){
                    player = object;
                }
            }
            
            this.id = this.game.wallId;

            this.sprite = scene.physics.add.sprite(x, yTop, 'wall'+scene.currentBG[0]).setCollideWorldBounds().setBounce(0).setImmovable(true).setOrigin(0.5, 0);
            this.sprite.setName("wallTop"+this.id);    
            this.sprite.flipY = 1;
            this.sprite2 = scene.physics.add.sprite(x, yBot, 'wall'+scene.currentBG[0]).setCollideWorldBounds().setBounce(0).setImmovable(true).setOrigin(0.5, 0);
            this.sprite2.setName("wallBot"+this.id);
            this.sprite.width = window.innerWidth*0.2;
            this.sprite2.width = window.innerWidth*0.2;
            this.sprite.height = window.innerHeight*0.2;
            this.sprite2.height = window.innerHeight*0.2;

            // formula
            let timeToMove = 1 - 0.01*this.id;
            if(timeToMove < 0.5){
                timeToMove = 0.5;
            }
            let speedX = player.body.velocity.x;
            let speedY = Math.abs(player.body.velocity.y);
            if(speedY == 0){
                speedY = 300;
                speedX = 300;
            }
            let routeX = zazor;
            let routeY = Math.sqrt(Math.abs(Math.pow(timeToMove, 2) * (Math.pow(speedX/100, 2)+Math.pow(speedY/100, 2)) - Math.pow(routeX, 2)));
            //
            
            let doorSize = routeY;
            if (doorSize < this.game.pSpriteWH[1]*1.5){
                doorSize = this.game.pSpriteWH[1]*1.5;
            }
            this.game.bufTemp = (doorSize)*(this.game.wallId+1);
            //console.log(this.game.bufTemp);// !!!!
            let lastWallsSize = this.game.lastWallsSize.pop();

            let topMaxScale = Math.abs( ((window.innerHeight - (lastWallsSize[0] + doorSize))) /this.sprite.displayHeight);
            if(topMaxScale > ((window.innerHeight-doorSize)/this.sprite.displayHeight)){
                topMaxScale = (window.innerHeight-doorSize)/this.sprite.displayHeight;
            }

            let topScale = Phaser.Math.RND.integerInRange(0, topMaxScale*100)/100;

            let botMaxScale;
            if(this.sprite.displayHeight*topScale <= lastWallsSize[1]){
                //console.log("orientir new");
                botMaxScale = Math.abs(( ((window.innerHeight - (lastWallsSize[1] + doorSize))) /this.sprite.displayHeight));    
            }
            else{
                botMaxScale = Math.abs(( ((window.innerHeight - (this.sprite.displayHeight*topScale + doorSize))) /this.sprite.displayHeight));       
                //console.log("orientir old");
            }

            if(botMaxScale > ((window.innerHeight- doorSize)/this.sprite.displayHeight)){
                botMaxScale = (window.innerHeight- doorSize)/this.sprite.displayHeight;
            }
            
            let botScale = Phaser.Math.RND.integerInRange(0, botMaxScale*100)/100;
            //console.log(lastWallsSize,"(",topMaxScale,topScale,")"," (", botMaxScale, botScale,")");
            if(topScale < 0){
                topScale = 0;
            }
            if(botScale < 0){
                botScale = 0;
            }
            //console.log(topScale, botScale);
            this.sprite.scaleY = topScale;
            this.sprite2.scaleY = botScale;
            this.sprite2.y-= this.sprite2.displayHeight;
            scene.physics.add.collider(this.sprite, player, ()=> {      
                //this.game.scene.wake('GameOver');
                //this.game.scene.pause('GamePlay');
                }).setName("playerWall"+this.id);       

            scene.physics.add.collider(this.sprite2, player, ()=> {
                //this.game.scene.wake('GameOver');
                //this.game.scene.pause('GamePlay');  
                }).setName("playerWall"+this.id);   

            this.sprite.displayWidth = this.game.pSpriteWH[0];//this.game.minDim*0.2;
            this.sprite2.displayWidth = this.game.pSpriteWH[0];
            this.game.lastWallsSize.push([this.sprite2.displayHeight, this.sprite.displayHeight]);

            this.sprite.alpha = 0.5;
            this.sprite2.alpha = 0.5;
            
        },

        update: function (time)
        {
            
        },

    });

export default Wall