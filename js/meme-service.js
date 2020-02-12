'use strict'
var gNextId = 0
var isWriting = false
var gMeme = {
    img: 'http://127.0.0.1:5500/meme-imgs%20(square)/1.jpg',
    // selectedImgId: 5,
    selectedLineIdx: 0,

    lines: [
        { txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' },
        { txt: 'Thats true, he didnt', size: 20, align: 'left', color: 'red' },
    ]
}



function writeLine() {
    if (!isWriting) {
        return
    } else {
        let elText = document.getElementById('text')
        let text = elText.value
        renderCanvas(text)
    }
}

function openEditor(el) {
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.container').classList.add('hidden')
    gMeme.img = el.src
    renderCanvas()
}

function change(val) {
    isWriting = true
    writeLine(val)
}

function onChangingFontSize(id) {
    if (id === 1) {
        gCtx.font.split(' ');
        var newSize = (gFont += 5) + 'px';
        gCtx.font = newSize + ' ' + 'IMPACT'; /// using the last part
    } else {
        var cFont = gCtx.font;
        gCtx.font.split(' ');
        var newSize = (gFont -= 5) + 'px';
        gCtx.font = newSize + ' ' + 'IMPACT';
    }
    change()
    renderCanvas()
}


function onChangingLineHeight(id) {
    if (id === 1) {
        gYTop += 10
    } else {
        gYTop -= 10
    }
    change()
}




function onChangingLine() {

    var currLineIdx = gMeme.selectedLineIdx
    if (currLineIdx === 0) {
        currLineIdx++
    } else if (currLineIdx >= gMeme.lines.length - 1) {
        currLineIdx = 0
    }
    gMeme.selectedLineIdx = currLineIdx
    return currLineIdx
}


function saveMeme(elLink) {
    var imgContent = gCanvas.toDataURL();
    elLink.href = imgContent
    let elUpperText = document.getElementById('text')
    elUpperText.value = ''
}