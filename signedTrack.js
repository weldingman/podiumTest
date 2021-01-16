class SignedTrack{
  constructor(){
    this.signs = ["left", "right", "up", "down"];
    this.points = [];
    this.gridSize = 20;
    this.stepsX = width / this.gridSize;
    this.stepsY = height / this.gridSize;
    this.cells = [];
  }
  addPoint(){
    this.points.push(createVector(mouseX, mouseY));
  }
  showPoints(){
    for(var i = 0; i < this.points.length; i++){
      fill(255);
      noStroke();
      ellipse(this.points[i].x, this.points[i].y, 5, 5);
    }
  }

  showTrack(){
    for(var i = 1; i < this.points.length; i++){
      // fill(255);
      // noStroke();
      stroke(255);
      strokeWeight(1);
      line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y);
    }
  }

  updateCell(cellType){
    var cell;
    for(var i = 0; i < this.stepsX; i++){
      for (var j = 0; j < this.stepsY; j++) {
        // rect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
        if(this.overBox(i * this.gridSize, j * this.gridSize, this.gridSize) && mouseIsPressed){
          if(cellType != null){
            var x = i * this.gridSize;
            var y = j * this.gridSize
            var rw = createVector(x + (cellType.reward.x * this.gridSize), y + (cellType.reward.y * this.gridSize));
            cell = {x: x, y: y, type:cellType.direction, reward:rw};
          }

          // must do get cell function
          else{
            cell = {x: i * this.gridSize, y: j * this.gridSize, type:"filled"};
          }
          this.cells.push(cell);
        }
      }
    }
  }

  getCell(index){
    return this.cells[index];
  }

  getSize(){
    return this.cells.length;
  }

  showCells(){
    for(var i = 0; i < this.cells.length; i++){
      if(this.cells[i].type == "filled"){
        fill(255);
        rect(this.cells[i].x, this.cells[i].y, this.gridSize, this.gridSize);
      }
      else if(this.cells[i].type != null){
        fill(255);
        noStroke();
        rect(this.cells[i].x, this.cells[i].y, this.gridSize, this.gridSize);

        fill(0,255,0,150);
        rect(this.cells[i].reward.x, this.cells[i].reward.y, this.gridSize, this.gridSize);
        this.showSign(this.cells[i].x, this.cells[i].y, this.cells[i].type)
      }
    }
  }

  showSign(posX, posY, type){
    stroke(0);
    strokeWeight(1);
    if(type.x == -1){
      line(posX, posY + (this.gridSize / 2), posX + this.gridSize, posY + (this.gridSize / 2));
      line(posX, posY + (this.gridSize / 2), posX + (this.gridSize / 3), posY + (this.gridSize / 3));
      line(posX, posY + (this.gridSize / 2), posX + (this.gridSize / 3), posY + (this.gridSize / 3 * 2));
    }
    if(type.x == 1){
      line(posX, posY + (this.gridSize / 2), posX + this.gridSize, posY + (this.gridSize / 2));
      line(posX + this.gridSize, posY + (this.gridSize / 2), posX + this.gridSize - (this.gridSize / 3), posY + (this.gridSize / 3));
      line(posX + this.gridSize, posY + (this.gridSize / 2), posX + this.gridSize - (this.gridSize / 3), posY + (this.gridSize / 3 * 2));
    }
    if(type.y == -1){
      line(posX + (this.gridSize / 2), posY, posX + (this.gridSize / 2), posY + this.gridSize);
      line(posX + (this.gridSize / 2), posY, posX + (this.gridSize / 3), posY + (this.gridSize / 3));
      line(posX + (this.gridSize / 2), posY, posX + (this.gridSize / 3 * 2), posY + (this.gridSize / 3));
    }
    if(type.y == 1){
      line(posX + (this.gridSize / 2), posY, posX + (this.gridSize / 2), posY + this.gridSize);
      line(posX + (this.gridSize / 2), posY + this.gridSize, posX + (this.gridSize / 3), posY + this.gridSize - (this.gridSize / 3));
      line(posX + (this.gridSize / 2), posY + this.gridSize, posX + (this.gridSize / 3 * 2), posY  + this.gridSize - (this.gridSize / 3));
    }
  }

  showGrid(){
    noFill();
    strokeWeight(1);
    stroke(255);
    for(var i = 0; i < this.stepsX; i++){
      for (var j = 0; j < this.stepsY; j++) {
        rect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
      }
    }
  }

  // updateGrid(){
  //   for(var i = 0; i < this.stepsX; i++){
  //     for (var j = 0; j < this.stepsY; j++) {
  //       rect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
  //     }
  //   }
  // }


  overBox(bx, by, boxSize){
    if (mouseX > bx && mouseX < bx + boxSize && mouseY > by && mouseY < by + boxSize) {
      return true
    } else {
      return false;
    }
  }

}
