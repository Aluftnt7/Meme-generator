'use strict'
var gCanvas
var gCtx
var gFont = 30
var gX = 200
var gYTop = 50
var gYbottom = 350




function onInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');

}


function renderCanvas(text = 'Write something funny!') {
    gCtx.textAlign = "center";
    var img = new Image()
    img.src = gMeme.img
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        writeOnImg(text)
    }
}


function writeOnImg(text) {
    var currLineIdx = onChangingLine()
    console.log(currLineIdx);

    gCtx.font = gFont + 'px IMPACT'
    gCtx.strokeStyle = 'white'
    gCtx.fillText(text, gX, gYTop);
    gCtx.strokeText(text, gX, gYTop)
    gCtx.textAlign = "center";
    // gMeme.lines[currLineIdx].txt = text

}