// let difficulty=0
// let display_dim
// let imageWorkCanvas //canvas de la imagen princ

let pieces_list=[] //list canvas de la imagen princ
    pieces_list_unsort=[];
let puzzleWidth;
let puzzleHeight;
let pieceWidth;
let pieceHeight;

let currentPiece;
let currentDropPiece;


const imageRoot='imgns/'
const imgsW=[
    'casa.jpg','entrada.jpg','feria.jpg','patio.jpg'
]

let cant_piezas_nvl=0,
    imageWork


function setDifficult(difficulty){
  this.difficulty=difficulty
  cambioDivEntrada('btnSlctDiff','btnSlctImgW')
}

function createElement_Canvas(pieceWidth,pieceHeight,imag,indx=null,posX=0,posY=0){
  let canvas_aux= document.createElement('canvas');
  canvas_aux.width=pieceWidth+2;
  canvas_aux.height=pieceHeight+2;
  canvas_aux.style.border=' 1px solid gray';

  let ctx=canvas_aux.getContext('2d');
  
  var nImg=new Image()
        nImg.src=imag.src
        nImg.onload= function () {
            if (indx) { //divididas
                canvas_aux.id=indx;
                ctx.drawImage( imag,
                    posX,posY,pieceWidth,pieceHeight,//inside Orig
                     0,0,pieceWidth,pieceHeight,//inside Copy       
                 ) ;
            } else 
                canvas_aux.getContext('2d').drawImage(imag,0,0) ;
        }

  return canvas_aux;
}

function setNewObjectSize(obj,n_w,n_h) {
  let elmnt_clss=$(`#${obj}`)[0].style
  elmnt_clss.width=n_w;
  elmnt_clss.height=n_h;
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
// 

/**
 * establesco dimensiones en funcion del nivel
 * instauro la imagen que usar
 * construyo matriz de imagenes a usar
 */
function initEnviroment(){
  
    // dim reduciendo a 1/3 para que quepan los 2
    red_w= Math.floor (this.display_dim.width_resp /3)
    red_h= Math.floor (this.display_dim.height_resp /3)
    console.log(` ventana 1/3 w-${red_w},h-${red_h}`);
    
    
    // cambio de dimensiones
    setNewObjectSize('puzzle',red_w,red_h)
    setNewObjectSize('piezas',red_w,red_h)

    // pieces by difficulty 
    pieceWidth = Math.floor(red_w / this.difficulty);
    pieceHeight = Math.floor(red_h / this.difficulty); 
    console.log(` dividen into 1/${this.difficulty} w-${pieceWidth},h-${pieceHeight}`);
    
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
 cambioDivEntrada('cPuzInit','centroJuego')
 
 //   this.imageWork.src=imgsW[imgW]
  initPuzzDragDop(imgW,this.difficulty)

//   exijo contexto
    initEnviroment()
    fillWithDiv()

 
  let opo= $(`#canvasPuzGuia`)[0]
 
  opo.style["background-image"]=` url( ${imageWork.src})`
  opo.width=imageWork.width
  opo.height=imageWork.height
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
  

function getImageSrc(posc){
  let pp=new Image(); // document.createElement('img')
    pp.src= imageRoot+'bckgrnds/puzz_'+imgsW[posc];
return pp;
}


function createDiv_draggable(parent,index,clssNm,dragg=true,cnv=null){
    const div = document.createElement('div');
    div.className = clssNm;
    div.id = `${parent.id}_${index}`;
    div.draggable = dragg;
    if (cnv) div.appendChild(cnv.imagCnx)
    div.width=pieceWidth
    div.height=pieceHeight
    parent.appendChild(div);   
}

function fillWithDiv(){
  let piezz= $('#piezas')[0],
      puzz= $('#puzzle')[0]

      let cuenta=1,
        divContenedor=document.createElement('div')
        divContenedor.id='divPuzz_'+cuenta

    for (let index = 0; index < cant_piezas_nvl; index++) {
      
        if ((index+1 % this.difficulty)==0) {
          console.log(`hola`);
          divContenedor=document.createElement('div')
          divContenedor.id='divPuzz_'+(cuenta++)          
        }

       createDiv_draggable(divContenedor,index,'placeholder',false);// createDiv_draggable(puzz,index,'placeholder',false);
       // createDiv_draggable(piezz,index,'pieza',true,pieces_list_unsort[index]);
       piezz.appendChild(pieces_list_unsort[index].imagCnx)
    }
}


function initPuzzDragDop(imagPosc,difficulty){
    cant_piezas_nvl=difficulty * difficulty
    // set image on mainBoard
    imageWork= getImageSrc(imagPosc)    
}

