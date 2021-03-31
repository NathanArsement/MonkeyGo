
var monkey , monkey_running, monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, gamestate;
var play=1;
var end=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyCollided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 300);
  monkey=createSprite(100, 100, 20, 20);
  monkey.addAnimation("running", monkey_running);
    monkey.addAnimation("collided", monkeyCollided);
monkey.debug=true;
  monkey.scale=0.15;
  ground=createSprite(300, 250, 600, 1);
  ground.visible=false;
  score=0;
  
  obstacleGroup= new Group();
  bananaGroup= new Group();
  gamestate=play;
  score=0;
}


function draw() {
background("green");
  monkey.collide(ground);
  monkey.velocityY= monkey.velocityY+0.8;
  if(gamestate===1){
  text("Score: "+score, 550, 10);
  if(keyWentDown("space")){
    monkey.velocityY=-15;
  }
  spawnObstacles()
  spawnBanana()
    if(obstacleGroup.isTouching(monkey)){
      gamestate=end;
    }
    
    if(bananaGroup.isTouching(monkey)){
      score=score+1;
      bananaGroup.destroyEach();
    }
  }
  if(gamestate===0){
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
     monkey.changeAnimation("collided", monkeyCollided);
  }
  drawSprites();
}
 
function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,225,10,40);    
    //generate random obstacles
    var rand = Math.round(random(1,3));
     obstacle.addImage(obstaceImage);
    obstacle.velocityX = -(6 + 3*score/100);        
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacle.debug=true;
    obstacle.setCollider("rectangle", -30, 0, obstacle.width-100, obstacle.height-200);
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}



