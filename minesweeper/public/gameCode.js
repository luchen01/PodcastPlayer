const borderMatrix = [[-1, -1],[-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0],[1, 1]]

class Game {
  //row, col
  makeBoard(size, mineCount){
    //approach 1
    this.size = size;
    this.mineCount = mineCount;
    this.board = new Array(size).fill(null).map(a=>new Array(size).fill(0));
    while(mineCount){
      if(this.placeBomb()){
        mineCount --;
      }
    }
    this.print()
  }

  applyToBorders(row, col, fn){
    borderMatrix.forEach(([offsetRow, offsetCol])=>{
      const _row = row + offsetRow, _col = col + offsetCol;
      if(_row < 0 || _col < 0 || _row > this.size || _col > this.size) return false
      fn.call(this, _row, _col);
    })
  }

  gameOver(){
    new Audio('./bomb.mp3').play();
  }

  placeBomb(){
    const rand = Math.random() * this.size * this.size;
    const row = Math.floor(rand/this.size), col = Math.floor(rand % this.size);
    if(this.board[row][col] === 0){
      this.board[row][col] = 'B';
      this.applyToBorders(row, col, (row, col)=>{
        if(this.board[row][col] !== 'B'){
          this.board[row][col] ++;
        }
      })
      return true
    }
  }

  onClicked(e, row, col){
    console.log(e.type, row, col);
    const el = $(e.target);
    if(e.type === "click"){
      el.html(this.board[row][col]);
      el.removeClass('cover');
    }
    e.preventDefault();

  }

  buildBoardHTML(){
    for(let i in this.board){
      console.log(i, "|", this.board[i].join(' '));
    }

    const rootEl = $('#root');
    board.forEach((arrayOfColInRow, rowIX)=>{
      const rowEl = $('<div class = "row"')
      arrayOfColInRow.forEach((cell, colIX)=>{
        const cellEl = $(`<div id="${rowIX}-${colIX}" class = "cell cover" />`)
        cellEl.on('click contextmenu', (e)=>this.onClicked(e, rowIX, colIX));
        rowEl.append(cellEl)
      })
      rootEl.append(rowEl)
    })
  }

  print(){
    for(let i in this.board){
      console.log(i, "|", this.board[i].join(' '));
    }
  }
}



$( document ).ready(function() {
  const myGame = new Game();
  myGame.makeBoard(4, 3);


})
