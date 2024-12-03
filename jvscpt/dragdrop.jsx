const imageRoot='imgns/'
const imgsW=[
    'casa.jpg','entrada.jpg','feria.jpg','patio.jpg'
]

let cant_piezas_nvl=0,
    imageWork

function getImageSrc(posc){
  let pp=new Image()
    pp.src= imageRoot+'bckgrnds/puzz_'+imgsW[posc]
return pp
}


function createDiv_draggable(parent,index,clssNm,dragg=true,cnv=null){
    const div = document.createElement('div');
    div.className = clssNm;
    div.id = `${parent.id}_${index}`;
    div.draggable = dragg;
    if (cnv) div.appendChild(cnv.imagCnx)
    div.style.width=pieceWidth
    div.style.height=pieceHeight
    parent.appendChild(div);   
}

function fillWithDiv(){
  let piezz= $('#piezas')[0],
      puzz= $('#puzzle')[0]
    for (let index = 0; index < cant_piezas_nvl; index++) {
        createDiv_draggable(puzz,index,'placeholder',false);
        createDiv_draggable(piezz,index,'pieza',true,pieces_list_unsort[index]);
    }
}


function initPuzzDragDop(imagPosc,difficulty){
    cant_piezas_nvl=difficulty * difficulty
    // set image on mainBoard
    imageWork= getImageSrc(imagPosc)    
}

