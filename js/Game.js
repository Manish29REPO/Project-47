class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    redPlayer = createSprite(width/2-150, height/2);
    redPlayer.addImage("redTeam", redPlayerImg);
    redPlayer.scale = 0.5;

    bluePlayer = createSprite(width/2 + 150, height/2 );
    bluePlayer.addImage("blueTeam", bluePlayerImg);
    bluePlayer.scale = 0.5;


    ships = [ bluePlayer, redPlayer];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    //console.log(height)
    backgroundSound.setVolume(0.2);
    backgroundSound.play();
  
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
       image(track, 0, 0 , width, height);

      // this.showLeaderboard();

      // //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the ships in x and y direction
        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        ships[index - 1].position.x = x;
        ships[index - 1].position.y = y;


        if (keyDown("space")){
         shootSound.play();
          if(player.index == 1){
           
              var sprite = createSprite(bluePlayer.position.x, bluePlayer.position.y, 40, 10);
              sprite.shapeColor = "blue"
              sprite.velocity.x = +5
              
            
          }
          else{
              var sprite = createSprite(redPlayer.position.x, redPlayer.position.y, 40, 10);
              sprite.shapeColor = "red"
              sprite.velocity.x = -5
        }  
       }
      }
      console.log(player.positionY)
      // // handling keyboard events
     this.handlePlayerControls();
    
      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW) && player.positionY > 0) {
      player.positionY = player.positionY - 5;
      //player.velocityY = -5
      player.update();
      console.log(player.positionY)
    }

    if (keyIsDown(DOWN_ARROW) && player.positionY < height) {
      player.positionY = player.positionY + 5;
      //player.velocityY = +5
      player.update();
      console.log(player.positionY)
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }

  shoot(){
    if(player.index == 1){
      if(keyDown("z")){
        var sprite = createSprite(bluePlayer.position.x, bluePlayer.position.y, 40, 10);
        sprite.shapeColour = "blue";
        sprite.velocity.x = +5 ;
        

      }
    }
    else{
      if(keyDown("x")){
        var sprite = createSprite(redPlayer.position.x, redPlayer.position.y, 40, 10);
        sprite.shapeColour = "red"
        sprite.velocity.x = -5
    }
  }  

  }
}
