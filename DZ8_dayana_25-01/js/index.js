const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'Image/ground.png'

const foodImg = new Image()
foodImg.src = 'Image/food.png'

let box = 32

let score = 0

let food = {
    x:Math.round(Math.random() * 17 + 1) * box,
    y:Math.round(Math.random() * 15 + 3) * box
}

const snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown', direction)

let dir

function direction (event){
        if (event.keyCode === 37 && dir !== 'right') dir = 'left'
        else if (event.keyCode === 38 && dir !== 'down') dir = 'up'
        else if (event.keyCode === 39 && dir !== 'left') dir = 'right'
        else if (event.keyCode === 40 && dir !== 'up') dir = 'down'
}

function eatTail(head, arr) {
    for (let i = 0; i < arr/length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game)
            setModal()
        }
    }
}

function setModal() {
    const div = document.createElement('div')
    div.setAttribute('class', 'modal')
    const restart = document.createElement("button")
    restart.setAttribute("class", "restartBtn")
    div.append(restart)
    const scoreShow=document.createElement("h2")
    scoreShow.setAttribute("class", "Score")
    scoreShow.innerHTML = score
    div.append(scoreShow)
    document.body.append(div)
    restart.innerText = "New Game"
    const h1 = document.createElement("h1")
    h1.innerHTML = "Game over =) "
    h1.setAttribute("class", "game_over")
    div.append(h1)
    function Close() {
        div.style.display = "none"
    }

    restart.addEventListener("click", () => {
        Close()

        location.reload()
    })
}


function drawGame () {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'greenyellow'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = 'white'
    ctx.font = '50px Atial'
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === food.x && snakeY === food.y) {
        score++
        food = {
            x:Math.round(Math.random() * 17 + 1) * box,
            y:Math.round(Math.random() * 15 + 3) * box
        }
    } else snake.pop()

    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17){
        clearInterval(game)
        setModal()
    }



    if (dir === 'left') snakeX -= box
    if (dir === 'right') snakeX += box
    if (dir === 'up') snakeY -= box
    if (dir === 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)
}


const game = setInterval(drawGame, 100)



