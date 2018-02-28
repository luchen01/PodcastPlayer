$( document ).ready(function() {
  //create new empty board with customized row and col.
  var boardArr;
  var displayArr;

  function genBomb(rowNum, colNum, numberMine){
    var mineArr = new Set();
    while(mineArr.size < numberMine){
      let randomRow = ''+ Math.floor(Math.random()*rowNum);
      let randomCol = '' + Math.floor(Math.random()*colNum);
      mineArr.add(randomRow + "_" + randomCol);
    }
    console.log(mineArr);
    return mineArr;
  }

  function emptyBoard(rowNum, colNum){
    let boardArr = new Array(rowNum);
    let rowCount = 0;
    while(rowCount  < rowNum){
      boardArr[rowCount] = new Array(colNum);
      let colCount = 0;
      while(colCount < colNum){
        boardArr[rowCount][colCount] = 0;
        colCount ++;
      }
      rowCount++;
    }
    return boardArr;
  }

  function createBoard(rowNum, colNum, numberMine){
    //create global array representation of the board initialized with all 0
    boardArr = emptyBoard(rowNum, colNum);
    displayArr = emptyBoard(rowNum,colNum);
    let mines = genBomb(rowNum, colNum, numberMine); //set of mines

    //create board squares on the front end and add mines to board
    for(var i = 0; i < rowNum; i++){
      let rowHtml = `<div class="row" id=row_${i}></div>`
      $('#gameBoard').append(rowHtml);
      for(var j = 0; j < colNum; j++){
        let colHtml =`<div class="col" id=${i}_${j}></div>`
        $(`#row_${i}`).append(colHtml);
      }
    }

    //add mines to the board
    mines.forEach(el=>{
      let coor = el.split("_")
      let row = Number(coor[0]);
      let col = Number(coor[1]);
      boardArr[row][col] = 1;
      // console.log("row", row);
      console.log(`#${row}_${col}`);
      // $(`#${row}_${col}`).addClass("hasMine");
    })

    //count neighboring mines and display on the displayBoard;
    for(var i = 0; i < displayArr.length; i ++){
      for(var j = 0; j < displayArr[0].length; j++){
        displayArr[i][j] = getNeighbors(i, j, boardArr).countMine;
      }
    }
    console.log("boardArr", boardArr);
    console.log("displayArr", displayArr);
  }

  function getNeighbors(row, col, board){
    let countMine = 0;
    let neighbors = [];
    if(row > 0){
      //top
      if(board[row -1][col] === 1){countMine ++}
      neighbors.push([row -1, col, displayArr[row-1][col]]);
      //topLeft
      if(col > 0){
        if(board[row -1][col-1] === 1){countMine ++}
        neighbors.push([row-1, col-1, displayArr[row -1][col-1]]);
      }
      //topRight
      if(col < board[row].length -1){
        if(board[row-1][col+1]===1){countMine ++}
        neighbors.push([row-1, col+1,displayArr[row-1][col+1]]);
      }
    }
      //left
    if(col > 0){
      if(board[row][col-1] === 1){countMine ++}
      neighbors.push([row, col-1, displayArr[row][col-1]]);
    }
    //right
    if(col < board[row].length -1){
      if(board[row][col+1] === 1){countMine ++}
      neighbors.push([row, col+1,displayArr[row][col+1]]);
    }

    if(row < board.length -1){
      //bottom
      if(board[row+1][col] === 1){countMine ++}
      neighbors.push([row+1, col,displayArr[row+1][col]]);
      //bottomLeft
      if(col > 0){
        if(board[row+1][col-1] === 1){countMine ++}
        neighbors.push([row+1, col-1,displayArr[row+1][col-1]]);
      }
      //bottomRight
      if(col < board[row].length -1){
        if(board[row+1][col+1]===1){countMine ++}
        neighbors.push([row+1, col+1,displayArr[row+1][col+1]]);
      }
    }
    return {countMine, neighbors};
  }


  function BFS(row, col){
    let q = [];
    let haveSeen = new Set();
    q.push([row, col, 0]);

    while(q.length > 0){
      let currNode = q.pop();
      haveSeen.add(currNode);
        let newNeighbors = getNeighbors(currNode[0],currNode[1], boardArr).neighbors;
        newNeighbors.map(el=>{
          if(el[2]===0 && !haveSeen.has(el)){
            q.push(el);
          } else {
            haveSeen.add(el);
          }
        });
      }
      haveSeen.forEach(node=>{
        let displayNum = node[2];
        let row = node[0];
        let col = node[1];
        let showNeighbors = `<p>${displayNum}</p>`
        $(`#${row}_${col}`).append(showNeighbors);
      })
    }


  $('.newGameButton').on('click', (event)=>{
    event.preventDefault();
    $('#gameBoard').empty();
    const rowNum = Number($('#boardRow').val());
    const colNum = Number($('#boardCol').val());
    const numberMine = Number($('#numberMine').val());
    // $('#gameBoard').removeClass("hide");
    createBoard(rowNum, colNum, numberMine);
  })

  $('#gameBoard').delegate(".col",'click',(event)=>{
    event.preventDefault();
    const cellId = event.target.id;
    const clickedCell = cellId.split("_");
    const row = Number(clickedCell[0]);
    const col = Number(clickedCell[1]);

    //check if the cell has a mine
    if(boardArr[row][col] === 1){
      // alert("You hit a mine!");
      let bomb = `<img class="mineImg" src = "./mine.png" alt = "Mine">`
      for(let i = 0; i < boardArr.length; i++){
        for(let j = 0; j < boardArr[i].length; j++){
          if(boardArr[i][j] === 1){
              $(`#${i}_${j}`).append(bomb);
              $(`#${i}_${j}`).addClass("hasMine")
          }
        }
      }
    } else if(getNeighbors(row, col, boardArr).countMine !== 0){
        //check if the cell is surrounded by mines
        let displayNum = getNeighbors(row, col, boardArr).countMine;
        let showNeighbors = `<p>${displayNum}</p>`
        $(`#${row}_${col}`).append(showNeighbors);
        $(`#${row}_${col}`).addClass("checked");
    } else if(getNeighbors(row, col, boardArr).countMine === 0){
        //if the cell is not surrounded by mine, use BFS to find the enclosed area
        console.log(getNeighbors(row, col, boardArr).neighbors);
        // BFS(row, col);
    }
  })
})
