import Wall from './wall.js'

function spawnWall(scene, yTop, yBot, pSpriteW, player){

    if(scene.wallId == 0){
        let topWall = scene.physics.add.sprite(window.innerWidth*5/2, window.innerHeight*2, "invis").setOrigin(0.5, 0.5).setBounce(0).setImmovable(true);
        topWall.setName("Top");
        topWall.scaleX = (window.innerWidth/topWall.displayWidth)*5;
        scene.physics.add.collider(player, topWall, ()=> {      
                    }).setName("TopHorisontalWall");     
        let botWall = scene.physics.add.sprite(window.innerWidth*5/2, window.innerHeight*3, "invis").setOrigin(0.5, 0.5).setBounce(0).setImmovable(true);
        botWall.setName("Bot");
        botWall.scaleX = (window.innerWidth/botWall.displayWidth)*5;
        scene.physics.add.collider(player, botWall, ()=> {      
                    }).setName("BotHorisontalBot");
    }
    if(scene.firstPress){
        let preZazor;
        (scene.minDim*0.1 - (scene.minDim*0.01)*scene.wallId*0.001)>0?preZazor=(scene.minDim*0.1 - (scene.minDim*0.01)*scene.wallId*0.001):0;
        let zazor = pSpriteW + preZazor; 
        let wallNumbers = Math.floor((3*window.innerWidth-window.innerWidth*0.2*2)/(window.innerWidth*0.2 + zazor));//7;
        scene.halfWalls =  Math.floor(wallNumbers/2);
        let wallsBeforNewSpawned = Math.floor(wallNumbers/2); //!!!
        let nextSpawnPos;
        if(wallNumbers%2==0){
            nextSpawnPos = (zazor)*(wallsBeforNewSpawned+1);
        }else{
            nextSpawnPos = (zazor)*(wallsBeforNewSpawned);
        }
        for(let i = 0; i <= wallNumbers; i++){
            let x = player.x;
            new Wall(scene, window.innerWidth*0.35+window.innerWidth*2+(zazor+scene.pSpriteWH[0])*(i), yTop, yBot, scene.wallId, zazor);  
            scene.wallId+=1;
        }   
    }
}

export default spawnWall