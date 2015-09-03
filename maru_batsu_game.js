//-------------------------------
//MaruBatsu
//-------------------------------
var MaruBatsu = function(){};
MaruBatsu.prototype.entry = function(maruPlayerName,batsuPlayerName){
  this.maruPlayer = maruPlayerName;
  this.batsuPlayer = batsuPlayerName;
  this.nextPlayer = this.maruPlayer;
};
MaruBatsu.prototype.toNextPlayer = function(key){
  this.cells[key] = this.nextPlayer;
  if (this.nextPlayer === this.batsuPlayer) {
    this.nextPlayer = this.maruPlayer;
    return true;
  } else {
    this.nextPlayer = this.batsuPlayer;
    return false;
  }
};
MaruBatsu.prototype.reset = function(length){
  //reset
  this.cells = {};
  this.breakableLines = [];
  this.winner = "";
  //1辺の方眼の数
  this.length = length;
  //方眼の列と行を作成
  this.makeCells();
  //勝ちkeyの組み合わせを作成
  //行列
  this.rowColumnLines();
  //斜め
  this.crossLines();
};
MaruBatsu.prototype.isBreake = function(){
  //勝ちkeyの組み合わせ毎にvalueの配列を取得
  for (var i = 0 ; i < this.breakableLines.length ; i++){
    var arr = [], name ;
    for (var j = 0 ; j < this.length ; j++){
      arr.push(this.cells[this.breakableLines[i][j]]);
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
//private
MaruBatsu.prototype.rowColumnLines = function () {
  for (var row = 1 ; row <= this.length ; row++){
    rowLines = [];
    columnLines = [];
    for (var column = 1 ; column <= this.length ; column++){
      rowLines.push(row.toString() + column.toString());
      columnLines.push(column.toString() + row.toString());
    }
    this.breakableLines.push(rowLines);
    this.breakableLines.push(columnLines);
  }
}
MaruBatsu.prototype.crossLines = function (){
  leftDiagonalLine = [];
  rightDiagonalLine = [];
  for (var row = 1 , column = this.length; row <= this.length ; row++,column--){
    rightDiagonalLine.push(row.toString() + column.toString())
    leftDiagonalLine.push(row.toString() + row.toString())
  }
  this.breakableLines.push(rightDiagonalLine);
  this.breakableLines.push(leftDiagonalLine);
}
MaruBatsu.prototype.makeCells = function () {
  for (var row = 1 ; row <= this.length ; row++){
    for (var column = 1 ; column <= this.length ; column++){
      this.cells[row.toString() + column.toString()] = null;
    }
  }
}
