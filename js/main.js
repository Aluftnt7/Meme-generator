'use strict'
var gCanvas
var gCtx




function onInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    renderCanvas()
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
            var pos = memeObj.linePosY

            writeOnImg(txt, idx, pos, color, font)
        });
    }
}




function writeOnImg(text, idx, pos, color, font) {

    gCtx.font = font + 'px IMPACT'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.fillText(text, gX, pos);
    gCtx.strokeText(text, gX, pos)
    gCtx.textAlign = "center";
    gMeme.lines[idx].txt = text

}

function onApplayColor(id) {
    setColor(id)
    renderCanvas()
}

function onChangingLine() {
    toggleLine()
    let text = document.getElementById('text')
    text.value = ''
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