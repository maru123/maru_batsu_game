//-------------------------------
//MaruBatsu
//-------------------------------
var MaruBatsu = function(){
  this.myTurn = "batsu";
};
MaruBatsu.prototype.reset = function(lengthOfSide){
  //reset
  this.squares = [];
  this.BreakableLeftDiagonal = [];
  this.BreakableRightDiagonal = [];

  //1辺の方眼の数
  this.lengthOfSide = lengthOfSide;

  //方眼の列と行を作成
  for (var i = 1 ; i <= this.lengthOfSide ; i++){
    for (var j = 1 ; j <= this.lengthOfSide ; j++){
      this.squares.push(new Square(j,i));
    }
  }
  //対角線の列行を作成
  for (var i = 1 , j = this.lengthOfSide.length ; i <= this.lengthOfSide ; i++,j--){
    this.BreakableLeftDiagonal.push({i,i});
    this.BreakableRightDiagonal.push({i,j});
  }
  //Playerをエントリー
  this.maru = new Player();
  this.batsu = new Player();
};
MaruBatsu.prototype.selectSquare = function(row,column){
  if (this.myTurn === "batsu"){
    this.batsu.storedRowColumn(row,column);
    this.myTurn = "maru"
    if (this.batsu.rows.length > 2) return this.isBreake(this.batsu);
  }else{
    this.maru.storedRowColumn(row,column);
    this.myTurn = "batsu"
    if (this.maru.rows.length > 2) return this.isBreake(this.maru);
  };
};
MaruBatsu.prototype.isBreake = function(player){
  console.log(player)
  //列が揃ったか
  console.log('---------------------rows')
  for (var i = 1 ; i <= this.lengthOfSide; i++){
    var count = 0;
    for (var j = 0; j < player.rows.length; j++){
      if (player.rows[j] === i) count++;
    }
    if (count >= 3) {
      console.log('win!')
      return true;
    };
  }
  //行が揃ったか
  console.log('---------------------columns')
  for (var i = 1 ; i <= this.lengthOfSide; i++){
    var count = 0;
    for (var j = 0; j < player.columns.length; j++){
      if (player.columns[j] === i) count++;
    }
    if (count >= 3) {
      console.log('win!')
      return true;
    };
  }
  //対角線が揃ったか
  console.log('---------------------LeftDiagonal')
  var count = 0;
  for (var i = 1 ; i <= this.lengthOfSide; i++){
    for (var j = 0; j < player.columns.length; j++){
      if (player.rows[j] === i && player.columns[j] === i ) count++;
    }
    if (count >= 3) {
      console.log('win!')
      return true;
    };
  }
  console.log('---------------------RightDiagonal')
  var count = 0;
  for (var i = 1 ; i <= this.lengthOfSide; i++){
    for (var j = 0; j < player.columns.length; j++){
      if (player.rows[j] === i && player.columns[j] === this.lengthOfSide-j ) count++;
    }
    if (count >= 3) {
      console.log('win!')
      return true
    };
  }

};
// -------------------------------
//Square
// -------------------------------
var Square = function(row,column){
  this.isAvailable = true
  this.row = row;
  this.column = column;
};
// -------------------------------
//Player
// -------------------------------
var Player = function(){
  this.rows = [];
  this.columns = [];
  this.rowsColumns = [];
};
//自分の陣地を覚える(選ばれた方眼の位置を取得する)
Player.prototype.storedRowColumn = function(row,column){
  this.rows.push(row);
  this.columns.push(column);
  this.rowsColumns.push({row,column});
};
