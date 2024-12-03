let difficulty=0
let display_dim
let imageWorkCanvas //canvas de la imagen princ

let pieces_list=[] //list canvas de la imagen princ
    pieces_list_unsort=[];
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;

let currentPiece;
let currentDropPiece;

function setDifficult(difficulty){
  this.difficulty=difficulty
  cambioDivEntrada('btnSlctDiff','btnSlctImgW')
}

function createElement_Canvas(pieceWidth,pieceHeight,imag,indx=null,posX=0,posY=0){
  canvas_aux= document.createElement('canvas');
  canvas_aux.width=pieceWidth;
  canvas_aux.height=pieceHeight;
  
  if (indx) { //divididas
    canvas_aux.id=indx;
    canvas_aux.getContext('2d').drawImage( imag,
        posX,posY,pieceWidth,pieceHeight,//inside Orig
        0,0,pieceWidth,pieceHeight,//inside Copy       
    ) ;
  } else 
    canvas_aux.getContext('2d').drawImage( imag,0,0) ;

  return canvas_aux;
}


function buildPieces() {
    let xPos = 0;
	let yPos = 0;
	for (i = 0; i < cant_piezas_nvl; i++) {
		piece = {};
		piece.sx = xPos;
		piece.sy = yPos;
        // image canvas context 2d 
        imagInside=createElement_Canvas(
            pieceWidth,pieceHeight,
            imageWork,
            'puzz_'+i,
            xPos,yPos
        );
        piece.imagCnx=imagInside
        // empacar imagenes
		pieces_list.push(piece);
		xPos += pieceWidth;
		if (xPos >= puzzleWidth) {
			xPos = 0;
			yPos += pieceHeight;
		}
	}
	
}

/**
 * establesco dimensiones en funcion del nivel
 * instauro la imagen que usar
 * construyo matriz de imagenes a usar
 */
function initEnviroment(){
    // dim reduciendo a 1/3 para que quepan los 2
    red_w= this.display_dim.width_resp /3
    red_h= this.display_dim.height_resp /3
    // 
    pieceWidth = Math.floor(red_w / this.difficulty);
	pieceHeight = Math.floor(red_h / this.difficulty);
	puzzleWidth = pieceWidth * this.difficulty;
	puzzleHeight = pieceHeight * this.difficulty;

    // imagen
    imageWorkCanvas=createElement_Canvas(
        this.display_dim.width_resp,this.display_dim.height_resp,
        imageWork)

    // matriz
    buildPieces();
    
    // unsort
    pieces_list_unsort=shuffleArray(pieces_list)
}


function setImageWork(imgW){
//   this.imageWork.src=imgsW[imgW]
  initPuzzDragDop(imgW,this.difficulty)

//   exijo contexto
    initEnviroment()
    fillWithDiv()

  cambioDivEntrada('cPuzInit','centroJuego')
}
/**
 * Vaciar el elemento que se pase por parametro
 * @param {*} elto id del elemento
 */
function vaciarElto(elto) {
    let quitarDatos = document.getElementById(elto)
    // 1-vaciar
    while (quitarDatos.firstChild) {
      // The list is LIVE so it will re-index each call
      quitarDatos.removeChild(quitarDatos.firstChild);
    }
  }

  function cambioDivEntrada(divActual, divSiguiente) {
    // ocultar div actual
    $('#' + divActual).fadeOut()
    // mostar proximo div
    $('#' + divSiguiente).fadeIn()
  }

 /**
 *  Mostrar las dimensiones del ente/etiqueta a la que se llama
 * @param {String} event_call event who call's 
 */
function displayDim(event_call){

    function pageWidth() {
      return window.innerWidth != null? window.innerWidth : document.documentElement &&
      document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null
      ? document.body.clientWidth : null;
      }
      function pageHeight() {
      return window.innerHeight != null? window.innerHeight : document.documentElement &&
      document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body !=
      null? document.body.clientHeight : null;
      }  
  
    this.display_dim={
      width_resp:pageWidth(),
      height_resp:pageHeight()
    }
    console.log(event_call,this.display_dim);    
  }
  
function beginGame( ){
    displayDim('l')

    let ig=$('#img_init')[0].style
        ig.width =  (this.display_dim.width_resp * .9) +'px'
        ig.height = (this.display_dim.height_resp * .9)+'px'
  }
  
  
  function Salir(){
    window.location.href='index.html'
  }

  function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
  