var gamepads;
var gamepad;


var m = [];
var savedMovers = [];
var rSpeed = 0;
var lSpeed = 0;

var t;

var TOTAL = 100;
var showMovers = true;
var cycles = 200;

var editMode = true;
var worldMap;
var value = null;


function setup(){
  createCanvas(1800, 950);
  // worldMap = new SignedTrack();
  // gamepad = new Gamepad();
  // gamepads = navigator.getGamepads();
  //
  // for (var i = 0; i < gamepads.length; ++i)
  // {
  //     var pad = gamepads[i];
  // }
  //
  // gamepad.on('connect', e => {
  //   console.log(`controller ${e.index} connected!`)});

    for (var i = 0; i < TOTAL; i++) {
      m[i] = new Mover(createVector(500,100));
    }

    t = new Track(200, 90, createVector(600, 300));
  }

function mouseClicked() {
  showMovers = !showMovers;
}

function mouseClicked() {
  // worldMap.addPoint();
}

function keyPressed() {
  console.log(key);
  if (key === 'A') {
    value = {direction:createVector(-1, 0), reward:createVector(-2, 0)};
  }
  else if (key === 'D') {
    // value = 'right';
    value = {direction:createVector(1, 0), reward:createVector(2, 0)};
  }
  else if (key === 'W') {
    // value = 'up';
    value = {direction:createVector(0, -1), reward:createVector(0, -2)};
  }
  else if (key === 'S') {
    // value = 'down';
    value = {direction:createVector(0, 1), reward:createVector(0, 2)};
  }
  else value = null;
}

  function keyReleased() {
    value = null;
  }

function draw(){
  background(51);
  // if(!editMode){
    for (var i = 0; i < m.length; i++) {
      var targetIndex = m[i].getTargetIndex();
      var target = t.getPos(targetIndex);
      var target2 = t.getPos(targetIndex + 1);
      var target3 = t.getPos(targetIndex + 2);
      // m[i].think(target, target2);
      if(m[i].think(target, target2, t.length)){
      // if(worldMap.getSize() > 0){
        // var cell = worldMap.getCell(targetIndex);
        // var instructionA = cell.type.x;
        // var instructionB = cell.type.y;
        // var reward = cell.reward;
        // if(m[i].think(instructionA, instructionB, reward)){
          m[i].show();
          if(showMovers || m[i].getPassFitness){
            m[i].show();
          }
        }
        else{
          savedMovers.push(m.splice(i, 1)[0]);
        }
      }
      if(m.length <= 0){
        nextGeneration();

      }
    // }
    t.show();
  // }
  // worldMap.showPoints();
  // worldMap.showTrack();
  // worldMap.showGrid();
  // worldMap.updateCell(value);
  // worldMap.showCells();

}

// function gamepadEvent(){
//   rSpeed = gamepads[0].axes[5] * 0.005;
//   lSpeed = gamepads[0].axes[1] * 0.005;
// }
