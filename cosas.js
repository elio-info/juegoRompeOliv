// variables
const PUZZLE_HOVER_TINT = '#009900';
let canvas ,// ponder el juego= document.querySelector("#canvasPuz"),
	canvasGuia = document.querySelector("#canvasPuzGuia")	;
let stage 
const display_dim = new Image();
const rutaImg="imgns/puzz_"
const imgs=['casa']
let difficulty = 4;
let pieces;
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;
let currentPiece;
let currentDropPiece;
let mouse;

// eventos
//img.addEventListener('load',onImage,false);
display_dim.src = rutaImg+imgs[0]+'.jpg';

function beginGame(params='') {
	// tomar foto
	// stageImage= document.querySelector("#"+params)
	// stage = stageImage.getContext("2d");	
	//pongo letrero en foto de Inicio
	createTitle("Listos para empezar");
	// poner foto
	

	// canvas = document.querySelector("#"+params)
	
	
	
	pieceWidth = Math.floor(display_dim.width / difficulty);
	pieceHeight = Math.floor(display_dim.height / difficulty);
	puzzleWidth = pieceWidth * difficulty;
	puzzleHeight = pieceHeight * difficulty;
	setCanvas();
	initPuzzle();
	setPuzGuia(display_dim.src)
	
}

function onImage(e) {
    alert('i\sdvhb')
}

function setPuzGuia(imgGuia) {
	let cambio = canvasGuia
		cambio.style['display']='block'
		cambio.src=imgGuia
}

function setCanvas() {


    canvas.width = puzzleWidth;
    canvas.height = puzzleHeight;
    canvas.style.border = "1px solid black";
}
function initPuzzle() {
    pieces_list = [];
	mouse = { x: 0, y: 0 };
	currentPiece = null;
	currentDropPiece = null;
	stage.drawImage(
		display_dim,
		0,
		0,
		puzzleWidth,
		puzzleHeight,
		0,
		0,
		puzzleWidth,
		puzzleHeight
	);	
	
	buildPieces();
	
}

function createTitle(msg) {
    stage.fillStyle = "#000000";
    stage.globalAlpha = 0.4;
    stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
    stage.fillStyle = "#FFFFFF";
    stage.globalAlpha = 1;
    stage.textAlign = "center";
    stage.textBaseline = "middle";
    stage.font = "20px Arial";
    stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
}

function buildPieces() {
    let i;
	let piece;
	let xPos = 0;
	let yPos = 0;
	for (i = 0; i < difficulty * difficulty; i++) {
		piece = {};
		piece.sx = xPos;
		piece.sy = yPos;
		pieces_list.push(piece);
		xPos += pieceWidth;
		if (xPos >= puzzleWidth) {
			xPos = 0;
			yPos += pieceHeight;
		}
	}
	document.onpointerdown = shufflePuzzle;
}


function shufflePuzzle() {

	
    pieces_list = shuffleArray(pieces_list);
	stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
	let xPos = 0;
	let yPos = 0;
	for (const piece of pieces_list) {
		piece.xPos = xPos;
		piece.yPos = yPos;
		stage.drawImage(
			display_dim,
			piece.sx,
			piece.sy,
			pieceWidth,
			pieceHeight,
			xPos,
			yPos,
			pieceWidth,
			pieceHeight
		);
		stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
		xPos += pieceWidth;
		if (xPos >= puzzleWidth) {
			xPos = 0;
			yPos += pieceHeight;
		}
	}
	document.onpointerdown = onPuzzleClick;
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e) {
    if (e.layerX || e.layerX === 0) {
		mouse.x = e.layerX - canvas.offsetLeft;
		mouse.y = e.layerY - canvas.offsetTop;
	} else if (e.offsetX || e.offsetX === 0) {
		mouse.x = e.offsetX - canvas.offsetLeft;
		mouse.y = e.offsetY - canvas.offsetTop;
	}
	currentPiece = checkPieceClicked();
	if (currentPiece !== null) {
		stage.clearRect(
			currentPiece.xPos,
			currentPiece.yPos,
			pieceWidth,
			pieceHeight
		);
		stage.save();
		stage.globalAlpha = 0.9;
		stage.drawImage(
			display_dim,
			currentPiece.sx,
			currentPiece.sy,
			pieceWidth,
			pieceHeight,
			mouse.x - pieceWidth / 2,
			mouse.y - pieceHeight / 2,
			pieceWidth,
			pieceHeight
		);
		stage.restore();
        document.onpointermove = updatePuzzle;
        document.onpointerup = pieceDropped;
	}
}

function checkPieceClicked() {
    for (const piece of pieces_list) {
		if (
			mouse.x < piece.xPos ||
			mouse.x > piece.xPos + pieceWidth ||
			mouse.y < piece.yPos ||
			mouse.y > piece.yPos + pieceHeight
		) {
			//PIECE NOT HIT 
		} else {
			return piece;
		}
	}
	return null;
}

function updatePuzzle(e) {
    currentDropPiece = null;
    if (e.layerX || e.layerX === 0) {
		mouse.x = e.layerX - canvas.offsetLeft;
		mouse.y = e.layerY - canvas.offsetTop;
	} else if (e.offsetX || e.offsetX === 0) {
		mouse.x = e.offsetX - canvas.offsetLeft;
		mouse.y = e.offsetY - canvas.offsetTop;
	}
	stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
	for (const piece of pieces_list) {
		if (piece === currentPiece) {
			continue;
		}
		stage.drawImage(
			display_dim,
			piece.sx,
			piece.sy,
			pieceWidth,
			pieceHeight,
			piece.xPos,
			piece.yPos,
			pieceWidth,
			pieceHeight
		);
		stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
		if (currentDropPiece === null) {
			if (
				mouse.x < piece.xPos ||
				mouse.x > piece.xPos + pieceWidth ||
				mouse.y < piece.yPos ||
				mouse.y > piece.yPos + pieceHeight
			) {
				//NOT OVER 
			} else {
				currentDropPiece = piece;
				stage.save();
				stage.globalAlpha = 0.4;
				stage.fillStyle = PUZZLE_HOVER_TINT;
				stage.fillRect(
					currentDropPiece.xPos,
					currentDropPiece.yPos,
					pieceWidth,
					pieceHeight
				);
				stage.restore();
			}
		}
	}
	stage.save();
	stage.globalAlpha = 0.6;
	stage.drawImage(
		display_dim,
		currentPiece.sx,
		currentPiece.sy,
		pieceWidth,
		pieceHeight,
		mouse.x - pieceWidth / 2,
		mouse.y - pieceHeight / 2,
		pieceWidth,
		pieceHeight
	);
	stage.restore();
	stage.strokeRect(
		mouse.x - pieceWidth / 2,
		mouse.y - pieceHeight / 2,
		pieceWidth,
		pieceHeight
	);
}

function pieceDropped(e){
    document.onpointermove = null;
    document.onpointerup = null;
    if(currentDropPiece !== null){
        let tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}
function resetPuzzleAndCheckWin() {
    stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
	let gameWin = true;
	for (piece in pieces_list) {
		stage.drawImage(
			display_dim,
			piece.sx,
			piece.sy,
			pieceWidth,
			pieceHeight,
			piece.xPos,
			piece.yPos,
			pieceWidth,
			pieceHeight
		);
		stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
		if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
			gameWin = false;
		}
	}
	if (gameWin) {
		setTimeout(gameOver, 500);
	}
}

function gameOver() {
    document.onpointerdown = null;
    document.onpointermove = null;
    document.onpointerup = null;
    initPuzzle();
}

function updateDifficulty(e) {
    difficulty = e.target.value;
    pieceWidth = Math.floor(display_dim.width / difficulty);
    pieceHeight = Math.floor(display_dim.height / difficulty);
    puzzleWidth = pieceWidth * difficulty;
    puzzleHeight = pieceHeight * difficulty;
    gameOver();
}