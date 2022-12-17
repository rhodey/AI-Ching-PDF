const fs = require('fs')
const {createCanvas} = require('canvas')

const width = 800
const height = 800
const margin = width / 9

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

function drawXLine(w, h) {
  let length = width
  ctx.moveTo(w, h)
  ctx.lineTo(w + length, h)
}

function drawYLine(w, h) {
  let length = height
  ctx.moveTo(w, h)
  ctx.lineTo(w, h + length)
}

function drawAllLines() {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 3
  for (let i = 1; i < 9; i++) {
    let coord = i * margin
    drawXLine(0, coord)
    drawYLine(coord, 0)
  }
  ctx.stroke()
}

function drawNumbers(w, h, numbers) {
  ctx.font = `italic 20px Helvetica`
  ctx.fillStyle = 'black'

  numbers.forEach((num, i) => {
    let tw = ctx.measureText(num + '').width
    let width = w + (i * margin) - (tw / 2)
    ctx.fillText(num + '', width, h)
  })
}

function drawAllNumbers() {
  let padding = 7
  let w = 1.5 * margin
  let h = 1.5 * margin + padding
  drawNumbers(w, h, [1, 34, 5, 26, 11, 9, 14, 43])
  h = 2.5 * margin + padding
  drawNumbers(w, h, [25, 51, 3, 27, 24, 42, 21, 17])
  h = 3.5 * margin + padding
  drawNumbers(w, h, [6, 40, 29, 4, 7, 59, 64, 47])
  h = 4.5 * margin + padding
  drawNumbers(w, h, [33, 62, 39, 52, 15, 53, 56, 31])
  h = 5.5 * margin + padding
  drawNumbers(w, h, [12, 16, 8, 23, 2, 20, 35, 45])
  h = 6.5 * margin + padding
  drawNumbers(w, h, [44, 32, 48, 18, 46, 57, 50, 28])
  h = 7.5 * margin + padding
  drawNumbers(w, h, [13, 55, 63, 22, 36, 37, 30, 49])
  h = 8.5 * margin + padding
  drawNumbers(w, h, [10, 54, 60, 41, 19, 61, 38, 58])
}

function drawElementsX(w, h, elements) {
  ctx.font = `bold italic 16px Helvetica`
  ctx.fillStyle = 'black'

  elements.forEach((element, i) => {
    let tw = ctx.measureText(element).width
    let width = w + (i * margin) - (tw / 2)
    ctx.fillText(element, width, h)
  })
}

function drawElementsY(w, h, elements) {
  ctx.font = `bold italic 16px Helvetica`
  ctx.fillStyle = 'black'

  elements.forEach((element, i) => {
    let tw = ctx.measureText(element).width
    let width = w - (tw / 2)
    let height = h + (i * margin)
    ctx.fillText(element, width, height)
  })
}

function drawElements() {
  let padding = 20
  let w = 1.5 * margin
  let h = 0.5 * margin - padding
  let elements = ['Heaven', 'Thunder', 'Water', 'Mountain', 'Earth', 'Wind', 'Fire','Lake']

  drawElementsX(w, h, elements)

  w = 0.5 * margin
  h = 1.5 * margin - padding
  drawElementsY(w, h, elements)
}

function drawUnbrokenLine(w, h) {
  let length = Math.floor(margin / 10)
  ctx.moveTo(w - length * 3, h)
  ctx.lineTo(w + length * 3, h)
}

function drawBrokenLine(w, h) {
  let length = Math.floor(margin / 10)
  ctx.moveTo(w - length * 3, h)
  ctx.lineTo(w - length, h)
  ctx.moveTo(w + length, h)
  ctx.lineTo(w + length * 3, h)
}

function drawTrigram(w, h, arr) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 5
  arr.forEach((line, i) => {
    if (line) {
      drawUnbrokenLine(w, h + i * 10)
    } else {
      drawBrokenLine(w, h + i * 10)
    }
  })
  ctx.stroke()
}

function drawTrigramsX(w, h, trigrams) {
  trigrams.forEach((trigram, i) => {
    let width = w + (i * margin)
    drawTrigram(width, h, trigram)
  })
}

function drawTrigramsY(w, h, trigrams) {
  trigrams.forEach((trigram, i) => {
    let height = h + (i * margin)
    drawTrigram(w, height, trigram)
  })
}

function drawTrigrams() {
  const Elements = {
    Heaven: [true, true, true],
    Thunder: [true, false, false],
    Water: [false, true, false],
    Mountain: [false, false, true],
    Earth: [false, false, false],
    Wind: [false, true, true],
    Fire: [true, false, true],
    Lake: [true, true, false],
  };
  let elements = Object.keys(Elements)
  elements = elements.map(key => Elements[key].reverse())

  let w = 1.5 * margin
  let h = 40
  drawTrigramsX(w, h, elements)
  w = 0.5 * margin
  h = 40 + margin
  drawTrigramsY(w, h, elements)
}

drawAllLines()
drawAllNumbers()
drawElements()
drawTrigrams()

canvas.createPNGStream()
      .pipe(fs.createWriteStream('table.png'))
