/* Note:
pieceData must be square, its length must be an odd number.
pieceData for buttons must be 3 by 3.
*/

// contains all piece shapes
const PIECES_POOL = [
  {
    extra: 2,
    pieceData: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 1,
    pieceData: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  },
  {
    extra: 1,
    pieceData: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]
  }, 
  {
    extra: 1,
    pieceData: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ]
  },
  {
    extra: 0,
    pieceData: [
      [1, 1, 0],
      [1, 1, 0],
      [1, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [1, 1, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ]
  }, 
  {
    extra: 0,
    pieceData: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ]
  }, 
  {
    extra: 1,
    pieceData: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  }, 
  {
    extra: 1,
    pieceData: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  }
]

const PRIMARY_COLOR = "yellow";
const SECONDARY_COLOR = "white";
const BOARD_SIZE = 7;
const BOARD_TILE_SCALE = 60;
const BOARD_CENTER_POS = [240, 240];
const SHRINKING_SPEED = 0.1;

let boardPieceData;
let filledPieceData;
let shrinkingProgress = 0; // goes down from 1 to 0
let selectedPieceKey = null; // null, first, second, third
let hoveredTilePos = null; // null or [x, y]
let canPlace = false;
let current3Pieces = {
  first: {
    pieceData: null,
    isHovered: false,
    pos: [550, 100]
  }, 
  second: {
    pieceData: null,
    isHovered: false,
    pos: [550, 250]
  }, 
  third: {
    pieceData: null,
    isHovered: false,
    pos: [550, 400]
  }
}
// shorter alias
const fp = current3Pieces.first;
const sp = current3Pieces.second;
const tp = current3Pieces.third;


// renders and detects hover for button
function renderButton(pieceObject, thisPieceKey){
	const BUTTON_SCALE = 40 // tile scale for the buttons
	pieceObject.isHovered = detectHover(
		pieceObject.pos, BUTTON_SCALE*3
	)
    const isHighlighted = pieceObject.isHovered || selectedPieceKey === thisPieceKey;
	renderPiece({
		colorValue: isHighlighted ? SECONDARY_COLOR : PRIMARY_COLOR,
		tileScale: BUTTON_SCALE,
		renderPos: pieceObject.pos,
		pieceData: pieceObject.pieceData
	})
}

function renderPiece({pieceData, renderPos, tileScale, colorValue, shrinkingValue=1}){
  // don't render anything if any of these required values is missing
  if (!pieceData || !renderPos || !tileScale || !colorValue) return
  
  fill(colorValue)
  
  const GRID_SIZE = pieceData.length
  for ( let y = 0; y < GRID_SIZE; y++ ) {
    for ( let x = 0; x < GRID_SIZE; x++ ) {
      if ( pieceData[y][x] === 1 ) { // this tile is filled?
        // shift to make the center tile to be [x: 0, y: 0]
        const calculatedX = x - (GRID_SIZE - 1) / 2;
        const calculatedY = y - (GRID_SIZE - 1) / 2;
				const renderX = renderPos[0] + calculatedX * tileScale;
				const renderY = renderPos[1] + calculatedY * tileScale;
        square(renderX, renderY, tileScale * shrinkingValue);
      }
    }
  }
}

// renders the grid of the board, and detects which tile is being hovered
function renderBoard(){
  noFill();
  for ( let y = 0; y < BOARD_SIZE; y++ ) {
    for ( let x = 0; x < BOARD_SIZE; x++ ) {
      const calculatedX = x - (BOARD_SIZE - 1) / 2;
      const calculatedY = y - (BOARD_SIZE - 1) / 2;
			const renderX = BOARD_CENTER_POS[0] + calculatedX * BOARD_TILE_SCALE;
			const renderY = BOARD_CENTER_POS[1] + calculatedY * BOARD_TILE_SCALE;
      square(renderX, renderY, BOARD_TILE_SCALE);
      // set hoveredTilePos
      if (detectHover([renderX, renderY], BOARD_TILE_SCALE)){
        hoveredTilePos = [x, y];
      }
    }
  }
}

// returns true if mouse is inside given square
function detectHover(renderPos, squareSize){
  const [x, y] = renderPos;
  const insideX = mouseX >= (x - squareSize/2) && 
        mouseX <= (x + squareSize/2);
  const insideY = mouseY >= (y - squareSize/2) && 
        mouseY <= (y + squareSize/2);
  
  return insideX && insideY;
}

function pickNew3Pieces(){
  ["first", "second", "third"].forEach(key => {
    const randomIndex = Math.floor(Math.random() * PIECES_POOL.length);
    current3Pieces[key].pieceData = PIECES_POOL[randomIndex].pieceData;
  });
}

function renderGhost(){
  const calculatedX = hoveredTilePos[0] - (BOARD_SIZE - 1) / 2;
  const calculatedY = hoveredTilePos[1] - (BOARD_SIZE - 1) / 2;
  const renderX = BOARD_CENTER_POS[0] + calculatedX * BOARD_TILE_SCALE;
  const renderY = BOARD_CENTER_POS[1] + calculatedY * BOARD_TILE_SCALE;
  
  renderPiece({
    pieceData: current3Pieces[selectedPieceKey].pieceData, 
    renderPos: [renderX, renderY], 
    tileScale: BOARD_TILE_SCALE, 
    colorValue: SECONDARY_COLOR
  })
}

function checkCanPlace(){
  /*
    for each tile, if not filled then ignore
    if filled check if it's inside the board
    also check if it collides with already placed tiles
  */
  const pd = current3Pieces[selectedPieceKey].pieceData;
  canPlace = pd.every((row, y) => row.every(
    (isFilled, x) => {
      if (isFilled === 1){
        // minus 1 to make the center tile 0,0 (pd is always 3x3)
        const finalX = x + hoveredTilePos[0] - 1;
        const finalY = y + hoveredTilePos[1] - 1;
        
        // check if it's inside the board
        const notOnBoardX = finalX < 0 || finalX >= BOARD_SIZE;
        const notOnBoardY = finalY < 0 || finalY >= BOARD_SIZE;
        if (notOnBoardX || notOnBoardY) return false;
        
        // check if it collides with filled tiles
        if (boardPieceData[finalY][finalX] === 1) return false;
        else return true; // passed all checks
        
      } else return true; // just emptiness, no check needed
    }
  ));
}

// place the piece, remove that piece button, renew the piece buttons if used all 3, check to clear row/column
function placeSelectedPiece(){
  // fill in the corresponding tiles for boardPieceData
  const pd = current3Pieces[selectedPieceKey].pieceData;
  pd.forEach((row, y) => {
    row.forEach((isFilled, x) => {
      if (isFilled === 1) {
        const finalX = x + hoveredTilePos[0] - 1;
        const finalY = y + hoveredTilePos[1] - 1;
        boardPieceData[finalY][finalX] = 1;
      }
    })
  })
  
  // remove the button
  current3Pieces[selectedPieceKey].pieceData = null;
  selectedPieceKey = null; // unselect
  // check if used all buttons to renew
  if (!fp.pieceData && !sp.pieceData && !tp.pieceData){
    pickNew3Pieces();
  }
  
  // set up filledPieceData
  filledPieceData = [];
  for ( let y = 0; y < BOARD_SIZE; y++ ){
  	let arr = []
    for ( let x = 0; x < BOARD_SIZE; x++ ){
      arr.push(0)
    }
    filledPieceData.push(arr)
  }
  // check all rows
  boardPieceData.forEach((row, rowIndex) => {
    // if this row is filled, set all tiles to 1
    if (row.every(isFilled => isFilled === 1)){
      console.log("row")
      filledPieceData[rowIndex] = row.map(isFilled => 1);
    }
  });
  // check all columns
  for (let i = 0; i < BOARD_SIZE; i++){
    let column = [...Array(BOARD_SIZE)];
    column = column.map((unused, rowIndex) => {
      return boardPieceData[rowIndex][i];
    });
    // if this column is filled, set all tiles to 1
    if (column.every(isFilled => isFilled === 1)){
      console.log("column")
      filledPieceData.forEach((row, rowIndex) => {
        // set the tile at 'i' of each row
        filledPieceData[rowIndex][i] = 1;
      });
    }
  }
  
  // apply the removals to boardPieceData
  boardPieceData = filledPieceData.map((row, rowIndex) => {
    return row.map((isFilled, columnIndex) => {
      // if this tile should be cleared
      if (isFilled === 1) return 0;
      else return boardPieceData[rowIndex][columnIndex];
    });
  });
  
  shrinkingProgress = 1; // starts animation
}

function setUpNewGame(){
  // set up empty boardPieceData (all positions are 0)
  boardPieceData = []
  for ( let y = 0; y < BOARD_SIZE; y++ ){
  	let arr = []
    for ( let x = 0; x < BOARD_SIZE; x++ ){
      arr.push(0)
    }
    boardPieceData.push(arr)
  }
  
  pickNew3Pieces();
  selectedPieceKey = null;
}

function setup() {
  createCanvas(640, 480);
  frameRate(30);
  rectMode(CENTER);
  
  // populate PIECES_POOL
  const temArr = PIECES_POOL.map(pieceObject => pieceObject);
  temArr.forEach(pieceObject => {
    for (let i=0; i < pieceObject.extra; i++){
      PIECES_POOL.push(pieceObject)
    }
  })
  
  setUpNewGame();
  createButton("Restart").mousePressed(setUpNewGame);
}

function draw() {
  background(100);
  // reset every new frame
  hoveredTilePos = null;
  canPlace = false;
  
  
  // animated shrinking tiles (if progress is ongoing)
  if (shrinkingProgress > 0) {
    renderPiece({
      colorValue: PRIMARY_COLOR,
      tileScale: BOARD_TILE_SCALE,
      renderPos: BOARD_CENTER_POS,
      pieceData: filledPieceData,
      shrinkingValue: shrinkingProgress
    })
    shrinkingProgress -= SHRINKING_SPEED;
  }
  
  // main board
  renderBoard()
  renderPiece({
    colorValue: PRIMARY_COLOR,
    tileScale: BOARD_TILE_SCALE,
    renderPos: BOARD_CENTER_POS,
    pieceData: boardPieceData
  })
  
  // detect hover and render the 3 piece buttons
	renderButton(fp, "first");
	renderButton(sp, "second");
	renderButton(tp, "third");
  
  // if is hovering on board and selected a piece
  if (hoveredTilePos !== null && selectedPieceKey !== null){
    checkCanPlace();
    if (canPlace) renderGhost();
    
    // render hovering selected piece
    renderPiece({
      colorValue: PRIMARY_COLOR,
      tileScale: BOARD_TILE_SCALE,
      renderPos: [mouseX, mouseY],
      pieceData: current3Pieces[selectedPieceKey].pieceData
    })
  }
    
}

// handles clicking to select 1 of the 3 pieces, or placing the selected piece on the main board
function mouseClicked(){
  if (canPlace) placeSelectedPiece()
  else {
    // selecting 1 of the 3 pieces (if that pieceData isn't null)
    if (fp.isHovered && fp.pieceData) selectedPieceKey = "first"
    else if (sp.isHovered && sp.pieceData) selectedPieceKey = "second"
    else if (tp.isHovered && tp.pieceData) selectedPieceKey = "third"
  }
}
