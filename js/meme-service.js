'use strict'
var isWriting = false
var gX = 250
var gFont = 30
var gNextId = 0
var gImges = createImgs()

function createImgs() {

    var img = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
        .map(createImg)

    return img;
}

function createImg(key) {
    return {
        id: gNextId++,
        key: key,
        imgUrl: `meme-imgs (square)/${key}.jpg`
    }
}

var gMeme = {
    img: 'http://127.0.0.1:5500/meme-imgs%20(square)/1.jpg',
    // selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [
        { txt: 'Write something funny!', size: 30, align: 'left', color: 'white', linePosY: 50 },
        { txt: 'And also here, be funny.', size: 30, align: 'left', color: 'white', linePosY: 460 },
    ]

}



function writeLine(val, idx) {
    if (!isWriting) {
        return
    } else {

        gMeme.lines[idx].txt = val
        renderCanvas(val, idx)
    }
}



function change(val) {
    isWriting = true
    var curIdx = gMeme.selectedLineIdx
    writeLine(val, curIdx)
}

function changeFontSize(id) {
    var currLineFont = gMeme.lines[gMeme.selectedLineIdx].size


    if (id === 1) {
        gCtx.font.split(' ');
        var newSize = (currLineFont += 1) + 'px';
        gCtx.font = newSize + ' ' + 'IMPACT'; /// using the last part
    } else {
        var cFont = gCtx.font;
        gCtx.font.split(' ');
        var newSize = (currLineFont -= 1) + 'px';
        gCtx.font = newSize + ' ' + 'IMPACT';
    }

    gMeme.lines[gMeme.selectedLineIdx].size = currLineFont
}





function setColor(id) {
    let fontColor = document.getElementById(id).value
    gMeme.lines[gMeme.selectedLineIdx].color = fontColor

}

function downloadMeme(elLink) {
    var imgContent = gCanvas.toDataURL();
    elLink.href = imgContent
    let text = document.getElementById('text')
    text.value = ''
}

function toggleLine() {
    var currLineIdx = gMeme.selectedLineIdx
    if (currLineIdx === 0 || currLineIdx < gMeme.lines.length - 1) {
        currLineIdx++

    } else if (currLineIdx === gMeme.lines.length - 1) {
        currLineIdx = 0

    }

    gMeme.selectedLineIdx = currLineIdx
}

function changeLineHeight(id) {
    var currLinePos = gMeme.lines[gMeme.selectedLineIdx].linePosY

    if (id === 1) {
        currLinePos += 10
    } else {
        currLinePos -= 10
    }

    gMeme.lines[gMeme.selectedLineIdx].linePosY = currLinePos
}

function openEditor(el) {
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.container').classList.add('hidden')
    gMeme.img = el.src
}


function addLine() {
    let newLine = {
        txt: 'You want more, ah?',
        size: 30,
        align: 'left',
        color: 'white',
        linePosY: 250
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = 2
    let text = document.getElementById('text')
    text.value = ''
}

function closeEditor() {
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.container').classList.remove('hidden')
}