let playBtn = document.querySelector('#play')
let pauseBtn = document.querySelector('#pause')

let canvas = document.querySelector('#canvas')
let canvasCtx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 300

const WIDTH = canvas.width
const HEIGHT = canvas.height

let url = './that_girl.mp3'
let url2 = 'http://audio.xmcdn.com/group38/M02/A0/B9/wKgJo1poJabwsXCdAIq9UvXKmjU838.m4a'

let audio = new Audio(url)
// audio.autoplay = true

let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let analyer = audioCtx.createAnalyser()

let source = audioCtx.createMediaElementSource(audio)
source.connect(analyer)
source.connect(audioCtx.destination)

analyer.fftSize = 256
let bufferLength = analyer.frequencyBinCount
let dataArr = new Uint8Array(bufferLength)
// analyer.getByteFrequencyData(dataArr)

function draw() {
  requestAnimationFrame(draw)
  analyer.getByteFrequencyData(dataArr)
  canvasCtx.fillStyle = 'rgb(0,0,0)'
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
  // console.log(dataArr, '2')

  let barWidth = (WIDTH / bufferLength) * 2.5
  let barHeight
  let x = 0
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArr[i]

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
    canvasCtx.fillRect(x, HEIGHT - barHeight/2, barWidth, barHeight / 2)
    x += barWidth + 1
  }
}

draw()


playBtn.onclick = () => {
  audio.play()
}

pauseBtn.onclick = () => {
  audio.pause()
}



