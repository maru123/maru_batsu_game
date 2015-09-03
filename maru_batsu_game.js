//-------------------------------
//MaruBatsu
//-------------------------------
var MaruBatsu = function(){};
MaruBatsu.prototype.entry = function(maruPlayerName,batsuPlayerName){
  this.maruPlayer = maruPlayerName;
  this.batsuPlayer = batsuPlayerName;
  this.myTurn = this.maruPlayer;
};
MaruBatsu.prototype.turn = function(key){
  this.squares[key] = this.myTurn;
  if (this.myTurn === this.batsuPlayer) {
    this.myTurn = this.maruPlayer;
    return true;
  } else {
    this.myTurn = this.batsuPlayer;
    return false;
  }
};
MaruBatsu.prototype.reset = function(lengthOfSide){
  //reset
  this.squares = {};
  this.breakableLines = [];
  this.winner = "";

  //1辺の方眼の数
  this.lengthOfSide = lengthOfSide;

  //方眼の列と行を作成
  for (var row = 1 ; row <= this.lengthOfSide ; row++){
    for (var column = 1 ; column <= this.lengthOfSide ; column++){
      this.squares[row.toString() + column.toString()] = null;
    }
  }

  //勝ちkeyの組み合わせを作成
  //行列
  for (var row = 1 ; row <= this.lengthOfSide ; row++){
    rowLines = [];
    columnLines = [];
    for (var column = 1 ; column <= this.lengthOfSide ; column++){
      rowLines.push(row.toString() + column.toString());
      columnLines.push(column.toString() + row.toString());
    }
    this.breakableLines.push(rowLines);
    this.breakableLines.push(columnLines);
  }
  //斜め
  LeftDiagonalLine = [];
  RightDiagonalLine = [];
  for (var row = 1 , column = this.lengthOfSide; row <= this.lengthOfSide ; row++,column--){
    RightDiagonalLine.push(row.toString() + column.toString())
    LeftDiagonalLine.push(row.toString() + row.toString())
  }
  this.breakableLines.push(RightDiagonalLine);
  this.breakableLines.push(LeftDiagonalLine);
};
MaruBatsu.prototype.isBreake = function(){
  //勝ちkeyの組み合わせ毎にvalueの配列を取得
  for (var i = 0 ; i < this.breakableLines.length ; i++){
    var arr = [], name ;
    for (var j = 0 ; j < this.lengthOfSide ; j++){
      arr.push(this.squares[this.breakableLines[i][j]]);
    }
    //配列の重複を削除
    name = arr.filter(function (x, i, self) {return self.indexOf(x) === i;});
    //判定
    if (name.length === 1 && name[0] != null) {
      this.winner = name[0];
      return true;
    }
  }
  return false;
};
