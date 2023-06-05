function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
let randomColor 

const onStartRandomColor = () => {
    randomColor = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    
    startBtn.disabled = true
    stopBtn.disabled = false
}

const onStopRandomColor = () => {
    clearInterval(randomColor);
    startBtn.disabled = false
    stopBtn.disabled = true
}

startBtn.addEventListener('click', onStartRandomColor)
stopBtn.addEventListener('click', onStopRandomColor)