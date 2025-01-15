let cant_piezas_nvl,
    imageWork,
    pctDvLvl
let pieces_list=[] //list canvas de la imagen princ
    pieces_list_index=[],
    pieces_list_index_unsort=[];
let puzzleWidth;
let puzzleHeight;
let puzzSelected,puzzToSwap;

const imageRoot='imgns/bckgrnds/puzz_'
const imgsW=[
    'casa.jpg','entrada.jpg','feria.jpg','patio.jpg'
]


// pasos 1 Iniciar juego y cambios de pantalla
/**
 * The function cambioDivEntrada hides the current div and shows the next div using jQuery fadeIn and
 * fadeOut methods.
 * @param divActual - The `divActual` parameter represents the ID of the current div that you want to hide or fade out.
 * @param divSiguiente - The `divSiguiente` parameter in the `cambioDivEntrada` function represents the ID of the next div that you want to display or show after hiding the current div.
 */
function cambioDivEntrada(divActual, divSiguiente) {
  // ocultar div actual
  $('#' + divActual).fadeOut()
  // mostar proximo div
  $('#' + divSiguiente).fadeIn()
}
// fin paso 1 Inicio juego y cambios de pantalla

// paso 2 Dificultad
/**
 * The function setDifficult sets the difficulty level and changes the appearance of a button.
 * @param difficulty - The `difficulty` parameter is a value that represents the level of difficulty for a particular task on game. It's  a numerical value.
 */
  function setDifficult(difficulty){
    pctDvLvl=difficulty
    cambioDivEntrada('btnSlctDiff','btnSlctImgW')
  }
// fin paso 2 Dificultad

// paso 3 Sellcion de foto

  /**
   * The function `setImageWork` sets up a puzzle game with a specified image and difficulty level.
   * @param imgW - The `imgW` parameter in the `setImageWork` function is used to specify the index of the image to be set for the puzzle game.
   */
  function setImageWork(imgW){
 
  // poner imagen en tag
    imageWork=document.getElementById("myImg");

  // poner imagen en tag
    imageWork.src= imageRoot+ imgsW[imgW]

    buildSpace()//organizar
  }

  function buildSpace(params) {
    // creando medidas de figuraPuzz
    puzzleWidth=Math.floor(pct.naturalWidth / pctDvLvl)+1 //rws
    puzzleHeight =Math.floor(pct.naturalHeight / pctDvLvl)+1 //clns

                
    createListIndexOrden(pieces_list_index,pctDvLvl)// crear orden de index
    shuffleArray(pieces_list_index,pieces_list_index_unsort) //formar relajo

    createCanvasArray(puzzleWidth,puzzleHeight)

   
    //ver el div
    cambioDivEntrada('cPuzInit','centroJuego')

    let opo= $(`#canvasPuzGuia`)[0]
  
    opo.style["background-image"]=` url( ${imageWork.src})`
    opo.width=imageWork.width
    opo.height=imageWork.height
  }
// fin paso 3 Sellcion de foto

  
  function Salir(){
    let opcion="https://elio-info.github.io/olivares",
      opcion02="http://www.olivelandfarmsrhvr.com/"

    window.location.href=opcion
  }

 /**
  * The function `shuffleArray` shuffles the elements of an array randomly.
  * @param o - The parameter `o` in the `shuffleArray` function is an array that contains the elements to be shuffled. When you call the `shuffleArray` function and pass an array as an argument, it will shuffle the elements of that array and return the shuffled array.
  * @returns The `shuffleArray` function returns the input array `o` after shuffling its elements
  * randomly.
  */
  function shuffleArray(o,r){
    r=Array.from(o)
    for(var j, x, i = r.length; i; j = parseInt(Math.random() * i), x = r[--i], r[i] = r[j], r[j] = x);
    console.log(`relajo:`,r); 
    return r;
}


/**
 * The function `createListIndexOrden` generates a list of indexes based on the specified level.
 * @param list_toCreate - The `list_toCreate` parameter is an array that will be populated with index values based on the specified level (`lvl`).
 * @param lvl - The `lvl` parameter in the `createListIndexOrden` function represents the level of the list to be created. It is used to determine the number of elements in the list by calculating `Math.pow(lvl, 2)`.
 */
function createListIndexOrden(list_toCreate, lvl) {
  for (let index = 0; index < Math.pow(lvl,2); index++) 
  list_toCreate.push(index);
  console.log(`orden:`,list_toCreate);  
}

/**
 * The function creates an array of canvas pieces based on the puzzle width and height.
 * @param puzzleWidth - The `puzzleWidth` parameter represents the width of each puzzle piece in the puzzle grid.
 * @param puzzleHeight - The `puzzleHeight` parameter in the `createCanvasArray` function represents the height of each puzzle piece in the canvas grid that is being created. It is used to calculate the vertical position of each puzzle piece within the grid.
 */
function createCanvasArray(puzzleWidth,puzzleHeight){
  let total=0
  for (let index_Row = 0; index_Row < pctDvLvl; index_Row++) {                  

      for (let index_Column = 0; index_Column < pctDvLvl; index_Column++){
              // table with canvas
              // guardo ordenado lo que hago y muestro
              pieces_list.push(
                  {
                      'colm':index_Column * puzzleWidth,//moverte por ancho
                      'rw':index_Row * puzzleHeight // moverte por alto
                  } 
              
          )//fin push

      } //fin index_Column
  }//fin index_Row
}  
  
