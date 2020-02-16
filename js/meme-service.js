'use strict'
var gFont = 30
var gNextId = 0
var gImges = createImgs()
var gUploadedImg

function createImgs() {

    var img = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
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
    img: gUploadedImg,
    // selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [
        { txt: 'Write something funny!', size: 30, align: 'left', color: 'white', linePosY: 50, linePosX: 250 },
        { txt: 'And also here, be funny.', size: 30, align: 'left', color: 'white', linePosY: 460, linePosX: 250 },
    ]

}



function writeLine(val, idx) {
    gMeme.lines[idx].txt = val
    renderCanvas()
}



function change(val) {
    var curIdx = gMeme.selectedLineIdx
    writeLine(val, curIdx)
}

function changeFontSize(id) {
    var currLineFont = gMeme.lines[gMeme.selectedLineIdx].size

    if (id === 1) {
        gCtx.font.split(' ');
        var newSize = (currLineFont += 2) + 'px';
        gCtx.font = newSize + ' ' + 'IMPACT'; /// using the last part
    } else {
        var cFont = gCtx.font;
        gCtx.font.split(' ');
        var newSize = (currLineFont -= 2) + 'px';
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
    if (currLineIdx < gMeme.lines.length - 1) {
        currLineIdx++
    } else if (currLineIdx === gMeme.lines.length - 1 || gMeme.lines.length === 1) {
        currLineIdx = 0
    }

    gMeme.selectedLineIdx = currLineIdx

    var currLineTxt = gMeme.lines[currLineIdx].txt
    var elText = document.getElementById('text')
    elText.value = currLineTxt
    rectFotIdx()

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
        linePosY: 250,
        linePosX: 250
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    let text = document.getElementById('text')
    text.value = ''
}

function closeEditor() {
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.container').classList.remove('hidden');
    (gMeme.lines.length === 2) ? '' : gMeme.lines.splice = gMeme.lines.splice(2);
    [gMeme.lines[0].txt, gMeme.lines[1].txt] = ['Write something funny!', 'And also here, be funny'];
    [gMeme.lines[0].linePosY, gMeme.lines[1].linePosY] = [50, 460]
    gMeme.selectedLineIdx = 0
    let text = document.getElementById('text')
    text.value = ''

}


function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x - 100, y, 500, 40)
    gCtx.strokeStyle = 'yellow'
    gCtx.stroke()
}

function rectFotIdx() {
    let currLineIdx = gMeme.selectedLineIdx

    let currLineY = gMeme.lines[currLineIdx].linePosY
    let currLineX = gMeme.lines[currLineIdx].linePosX
    drawRect(currLineX / 2.5, currLineY - 30)
}

function deleteLine() {
    let currLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(currLineIdx, 1)
    gMeme.selectedLineIdx = currLineIdx + 1
    let text = document.getElementById('text')
    text.value = ''
    renderCanvas();
}


function freeMovin(x, y) {
    let currLineIdx = gMeme.selectedLineIdx
    gMeme.lines[currLineIdx].linePosY = y
    gMeme.lines[currLineIdx].linePosX = x

    renderCanvas()
}

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            img.width = gCanvas.width;
            img.heigt = gCanvas.height;
        }
        img.src = event.target.result;
        gMeme.img = img.src
        document.querySelector('.editor-container').classList.remove('hidden')
        document.querySelector('.container').classList.add('hidden')
        renderCanvas()
    }
    reader.readAsDataURL(e.target.files[0]);
}