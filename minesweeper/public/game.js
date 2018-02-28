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

  function createBoard(rowNum, colNum, numberMine){
    let totalNum = rowNum * colNum;
    //create global array representation of the board initialized with all 0
    boardArr = new Array(rowNum);
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

    //create board for display neighboring mines
    displayArr = new Array(rowNum);
    rowCount = 0;
    while(rowCount  < rowNum){
      displayArr[rowCount] = new Array(colNum);
        colCount = 0;
      while(colCount < colNum){
        displayArr[rowCount][colCount] = 0;
        colCount ++;
      }
      rowCount++;
    }



    //create board squares on the front end
    for(var i = 0; i < rowNum; i++){
      let rowHtml = `<div class="row" id=row_${i}></div>`
      $('#gameBoard').append(rowHtml);
      for(var j = 0; j < colNum; j++){
        let colHtml = `<div class="col" id=${i}_${j}></div>`
        $(`#row_${i}`).append(colHtml);
      }
    }

    //add mines to the board
    genBomb(rowNum, colNum, numberMine).forEach(el=>{
      let coor = el.split("_")
      let row = Number(coor[0]);
      let col = Number(coor[1]);
      boardArr[row][col] = 1;
      // console.log("row", row);
      console.log(`#${row}_${col}`);
      $(`#${row}_${col}`).addClass("hasMine");
    })

    for(var i = 0; i < displayArr.length; i ++){
      for(var j = 0; j < displayArr[0].length; j++){
        displayArr[i][j] = getNeighbors(i, j);
      }
    }
    // displayArr = displayArr.map((rowElement, row)=>{
    //   return rowElement.map((item, col)=>{
    //     return getNeighbors(row, col);
    //   })
    // })

    console.log("boardArr", boardArr);
    console.log("displayArr", displayArr);

  }

  function getNeighbors(row, col){
    let countMine = 0;
    if(row > 0){
      //top
      if(boardArr[row -1][col] === 1){countMine ++}
      //topLeft
      if(col > 0){
        if(boardArr[row -1][col-1] === 1){countMine ++}
      }
      //topRight
      if(col < boardArr[row].length -1){
        if(boardArr[row-1][col+1]===1){countMine ++}
      }
    }
      //left
    if(col > 0){
      if(boardArr[row][col-1] === 1){countMine ++}
    }
    //right
    if(col < boardArr[row].length -1){
      if(boardArr[row][col+1] === 1){countMine ++}
    }

    if(row < boardArr.length -1){
      //bottom
      if(boardArr[row+1][col] === 1){countMine ++}
      //bottomLeft
      if(col > 0){
        if(boardArr[row+1][col-1] === 1){countMine ++}
      }
      //bottomRight
      if(col < boardArr[row].length -1){
        if(boardArr[row+1][col+1]===1){countMine ++}
      }
    }


    // for(var i = -1; i <= 1; i++){
    //   for(var j = -1; j <= 1; j++){
    //     if((i + row < 0)||
    //        (i + row > boardArr.length -1) ||
    //        (j + col < 0) ||
    //        (j + col > boardArr[0].length -1) ||
    //        (i === 0 && j === 0)
    //     ){
    //       continue;
    //     } else {
    //       console.log("i+row", i+row);
    //       console.log("i+col", i+col);
    //       if(boardArr[i+row][i+col] === 1){
    //         countMine = countMine + 1;
    //       }
    //     }
    //   }
    // }
    console.log("countMine", countMine);
    return countMine;
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
    console.log("inside click col");
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
          }
        }
      }
    } else if(getNeighbors(row, col) !== 0){
        //check if the cell is surrounded by mines
        let displayNum = getNeighbors(row, col);
        console.log("displayNum", displayNum);
        let showNeighbors = `<p>${displayNum}</p>`
        $(`#${row}_${col}`).append(showNeighbors);
    } else if(getNeighbors(row, col) === 0){
        //if the cell is not surrounded by mine, use BFS to find the enclosed area
          let q = [];
          
    }
  })
})
