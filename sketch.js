
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var survivalTime=0;

//gamestate
var PLAY=1;
var END=0;
var gamestate = PLAY;

function preload(){
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
}

function setup() {
//creating sprite for the monkey
monkey= createSprite(50,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;
  
//ground sprite
ground= createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
  
//creating groups
foodGroup=createGroup();
obstacleGroup=createGroup();
}


function draw() {
  
//clearing the background 
background("black"); 
  
if(gamestate===PLAY){
//resetting the background
ground.x=ground.width/2;
  
//jumping of sprite
if(monkey.y>314){
if(keyDown("space")){
monkey.velocityY=-18;
}
}
  
//gravity for the monkey
monkey.velocityY =monkey.velocityY+1; 
  
//food (banana)
Bananas();
  
//obstacles
obsatcles();
}
   
//what happens on touching the obstacle
if(monkey.isTouching(obstacleGroup)){
gamestate=END; 
  
//increasing the score
if(banana.isTouching(monkey)){    
score=score+2;
}
}
  
// making the sprite to stay in the frame
monkey.collide(ground); 


if(gamestate===END){
ground.velocityX=0;
obstacleGroup.setLifetimeEach(-1);
obstacleGroup.setVelocityXEach(0);
 }
//drawing the sprites
drawSprites();
  
//scoreboard display
stroke("white");
textSize(10);
fill("white");
text("Score: "+score,350,20);

//survival time
stroke("white");
textSize(20);
fill("white");
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: "+survivalTime,100,20);  
console.log(monkey.y);
}

function Bananas(){
if(frameCount%100===0){
banana=createSprite(400,Math.round(random(120,200)),20,20);
banana.addImage(bananaImage);
banana.scale=0.1;
banana.velocityX=-2;
banana.lifetime=200;
banana.debug=true;
foodGroup.add(banana);
}
}

function obsatcles(){
if(frameCount%300===0){
obstacle=createSprite(ground.x,330,20,20); 
obstacle.velocityX=-7;
obstacle.addImage(obstaceImage);
obstacle.scale=0.075;
obstacle.lifetime=110;
obstacle.debug=true;
obstacleGroup.add(obstacle);
}
}





