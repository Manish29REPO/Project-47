var canvas;
var backgroundImage, track;
var database, gameState;
var form, player, playerCount;
var allPlayers;
var ships = [];

var redPlayer, bluePlayer;
var redPlayerImg, bluePlayerImg;

var shootSound, backgroundSound;

function preload() {
  backgroundImage = loadImage("./assets/bg.jpg");
  track = loadImage("../assets/bg2.jpeg");

  bluePlayerImg = loadImage("./assets/bluePC.png");
  redPlayerImg = loadImage("./assets/redPC.png");

  shootSound = loadSound("./assets/shoot.wav");
  backgroundSound = loadSound("./assets/background.wav")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
