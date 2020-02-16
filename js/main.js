'use strict'
var gCanvas
var gCtx

var isMovin = false




function onInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    renderCanvas()
    gCanvas.addEventListener('mousedown', () => {
        isMovin = true

    })

    gCanvas.addEventListener('mousemove', () => {
        if (!isMovin) return
        let movingX = event.offsetX
        let movingY = event.offsetY
        freeMovin(movingX, movingY)
    })

    gCanvas.addEventListener('mouseup', () => {
        isMovin = false

    })
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

}



function renderImgs() {
    var strHTMLs = gImges.map(function(img) {
        return `
        <a> <img src="${img.imgUrl} " onclick="onOpenEditor(this) "> </a>`
    })
    var elImgesList = document.querySelector('.img-container');
    elImgesList.innerHTML = strHTMLs.join('');
}

function renderCanvas() {

    renderImgs()
    gCtx.textAlign = "center";
    var img = new Image()
    img.src = gMeme.img

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((memeObj, idx) => {
            var font = memeObj.size
            var color = memeObj.color
            var txt = memeObj.txt
            var posY = memeObj.linePosY
            var posX = memeObj.linePosX

            writeOnImg(txt, idx, posY, posX, color, font)
        });
    }

}




function writeOnImg(text, idx, posY, posX, color, font) {

    gCtx.font = font + 'px IMPACT'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.fillText(text, posX, posY);
    gCtx.strokeText(text, posX, posY)
    gCtx.textAlign = "center";
    gMeme.lines[idx].txt = text

}

function onApplayColor(id) {
    setColor(id)
    renderCanvas()
}

function onChangingLine() {
    let text = document.getElementById('text')
    text.value = ''
    text.focus()
    toggleLine()
}

function onChangingLineHeight(id) {
    changeLineHeight(id)
    renderCanvas()
}


function onChangingFontSize(id) {
    changeFontSize(id)
    renderCanvas()
}

function onOpenEditor(el) {
    openEditor(el)
    renderCanvas()
}


function onAddLine() {
    addLine()
    renderCanvas()

}

function onCloseEditor() {
    closeEditor()
}

function onDeleteLine() {
    deleteLine()
}