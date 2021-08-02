var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  
  
 pathImage = loadImage("download.png")
  
  mainRacerImg1 = loadImage("free-png-man-running-silhouette-png-images-transparent-running-silhouette-transparent-background-11563008512zgujozpqae-removebg-preview.png");
  
  mainRacerImg2 = loadImage("15-151043_clipart-bang-onomatopoeia-clipart-removebg-preview.png")
  
  oppPink1Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  oppPink2Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  
  oppYellow1Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  oppYellow2Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  
  oppRed1Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  oppRed2Img = loadImage("pngtree-stereoscopic-blue-obstacle-hurdle-png-image_348862-removebg-preview.png");
  
  
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(0,150);
path.addImage(pathImage);
path.velocityX = -5;
path.scale = 6.3;

//creating boy running
mainCyclist  = createSprite(70,150,10,10);
mainCyclist.addImage("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.15;
  
//set collider for mainCyclist
mainCyclist.setCollider("circle",0,0,300);
//mainCyclist.debug = true;

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,700,30);
 
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
  mainCyclist.addImage("SahilRunning",mainRacerImg1);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
  
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addImage("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addImage("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addImage("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    if(keyDown("UP_ARROW")) {
        gameState = PLAY;
        pinkCG.destroyEach();
        yellowCG.destroyEach();
        redCG.destroyEach();
        
    }
  
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addImage("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //write condition for calling reset( )
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.3;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addImage("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)), 30, 30);
        player2.scale =0.3;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addImage("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.3;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addImage("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//create reset function here






