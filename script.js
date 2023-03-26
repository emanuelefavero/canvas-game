window.onload = () => {
  function playGame() {
    // load sounds
    let coinSound = new Audio('./sounds/coin-sound.mp3')
    let budgieSound = new Audio('./sounds/budgie-sound.mp3')
    let natureSound = new Audio('./sounds/nature-sound.mp3')
    let chillMusic = new Audio('./sounds/chill-music.mp3')
    let gameOverSound = new Audio('./sounds/budgie-game-over-sound.mp3')

    // create canvas and setup
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    let canvasSize = 300
    canvas.width = canvasSize
    canvas.height = canvasSize

    // player, size, position
    let playerSize = 40
    let x = canvasSize / 2 - playerSize / 2
    let y = canvasSize / 2 - playerSize / 2
    let player = new Image()
    player.src = './images/budgie-cropped.png'

    // player speed
    let t = Date.now()
    let speed = 150

    // coin, size, position
    let coinSize = 20
    let coinX = Math.random() * (canvasSize - coinSize)
    let coinY = Math.random() * (canvasSize - coinSize)
    let coin = new Image()
    coin.src = './images/coin.gif'

    // score
    let score = 0
    const displayScore = document.getElementById('displayScore')
    displayScore.innerHTML = 'Score: ' + score

    // play sound first time player eats coin
    if (score > 0 && score < 2) {
      budgieSound.play()

      natureSound.loop = true
      natureSound.play()
      chillMusic.loop = true
      chillMusic.play()
    }

    budgieSound.play()

    natureSound.loop = true
    natureSound.play()
    chillMusic.loop = true
    chillMusic.play()

    //////// HANDLE USER INPUT FOR PLAYER DIRECTION ////////
    let direction = 'stop'
    const up = document.getElementById('up')
    const down = document.getElementById('down')
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    // -------------
    // ARROW BUTTONS
    // handle mouse virtual arrow button click
    // up.addEventListener('mousedown', () => (direction = 'up'))
    // down.addEventListener('mousedown', () => (direction = 'down'))
    // left.addEventListener('mousedown', () => (direction = 'left'))
    // right.addEventListener('mousedown', () => (direction = 'right'))

    // up.addEventListener('mouseup', () => (direction = 'stop'))
    // down.addEventListener('mouseup', () => (direction = 'stop'))
    // left.addEventListener('mouseup', () => (direction = 'stop'))
    // right.addEventListener('mouseup', () => (direction = 'stop'))

    // handle virtual button touch input
    // up.addEventListener('touchstart', () => (direction = 'up'))
    // down.addEventListener('touchstart', () => (direction = 'down'))
    // left.addEventListener('touchstart', () => (direction = 'left'))
    // right.addEventListener('touchstart', () => (direction = 'right'))
    // up.addEventListener('touchend', () => (direction = 'stop'))
    // down.addEventListener('touchend', () => (direction = 'stop'))
    // left.addEventListener('touchend', () => (direction = 'stop'))
    // right.addEventListener('touchend', () => (direction = 'stop'))
    // -------------

    // handle swipe actions on mobile (needs external library swiped-events.js)
    document.addEventListener('swiped-up', function (e) {
      e.preventDefault()
      direction = 'up'
    })
    document.addEventListener('swiped-down', function (e) {
      e.preventDefault()
      direction = 'down'
    })
    document.addEventListener('swiped-left', function (e) {
      e.preventDefault()
      direction = 'left'
    })
    document.addEventListener('swiped-right', function (e) {
      e.preventDefault()
      direction = 'right'
    })

    // handle physical wasd and arrow keys input
    document.addEventListener('keydown', (e) => {
      e = e || window.event

      if (e.keyCode == '38' || e.keyCode == '87') {
        direction = 'up'
      } else if (e.keyCode == '40' || e.keyCode == '83') {
        direction = 'down'
      } else if (e.keyCode == '37' || e.keyCode == '65') {
        direction = 'left'
      } else if (e.keyCode == '39' || e.keyCode == '68') {
        direction = 'right'
      }
    })
    // document.addEventListener('keyup', () => {
    //     direction = 'stop'
    // })

    function draw() {
      // fps calculation
      var timePassed = (Date.now() - t) / 1000
      t = Date.now()
      var fps = Math.round(1 / timePassed)

      // clear screen at the start of game loop
      context.clearRect(0, 0, canvasSize, canvasSize)

      // draw player
      context.beginPath()
      context.drawImage(player, x, y, playerSize, playerSize)
      // context.rect(x, y, playerSize, playerSize)
      // context.fillStyle = 'cyan'

      // setTimeout(() => {
      //     if (x === canvasSize / 2 - playerSize / 2) {
      //         // BEWARE: HERE PUT:
      //         // if after one second, the player is still not moving, display message:
      //         // DETECT PC OR MOBILE
      //         // IF MOBILE, TELL USER TO SWIPE
      //         // IF PC, TELL USER TO USE ARROW AND WASD KEYS
      //         // THEN, TODO:
      //         // DRAW DESIGNS, BACKGROUNDS, PLAYER ANIMATION ON IPAD, BEFORE STARTING PLAN THE WHOLE THING
      //         // PUT CLOUDS, TREES, ETC...
      //         // THEN TODO: CREATE NEW LEVELS OR SAME LEVEL WITH DIFFERENT BACKGROUND AND MUSIC, FOR EXAMPLE RAIN AND NIGHT INSTEAD OF CLOUD AND DAY
      //     }
      // }, 1000)

      // draw
      context.fill()

      // draw coin
      context.beginPath()
      context.drawImage(coin, coinX, coinY, coinSize, coinSize)
      // context.rect(coinX, coinY, coinSize, coinSize)
      // context.fillStyle = 'yellow'
      // context.fill()

      // bind movement speed relative to frame rate
      if (direction == 'right') {
        if (x + playerSize < canvasSize) {
          x += speed * timePassed
        }
      } else if (direction == 'left') {
        if (x > 0) {
          x -= speed * timePassed
        }
      } else if (direction == 'down') {
        if (y + playerSize < canvasSize) {
          y += speed * timePassed
        }
      } else if (direction == 'up') {
        if (y > 0) {
          y -= speed * timePassed
        }
      }

      // player and coin collision detection and score update
      if (
        coinX <= x + playerSize &&
        x <= coinX + coinSize &&
        coinY <= y + playerSize &&
        y <= coinY + coinSize
      ) {
        // score + 1
        score++

        // // play sound first time player eats coin
        // if (score >= 0 && score < 2) {
        //     budgieSound.play()

        //     natureSound.loop = true
        //     natureSound.play()
        //     chillMusic.loop = true
        //     chillMusic.play()
        // }

        // increase game speed
        speed = speed + score / 8
        // display score
        displayScore.innerHTML = 'Score: ' + score
        // play sound
        coinSound.play()
        // relocate new coin
        coinX = Math.random() * (canvasSize - coinSize)
        coinY = Math.random() * (canvasSize - coinSize)
      }

      // GAME OVER HANDLING
      const gameOver = document.getElementById('gameOver')
      gameOver.style.display = 'none'

      function stuffToDoWhenGameOver() {
        // clear canvas
        context.clearRect(0, 0, canvasSize, canvasSize)
        // display game over
        gameOver.style.display = 'flex'
        // play bugie game over sound
        gameOverSound.play()
        // stop background sounds
        natureSound.pause()
        chillMusic.pause()
      }

      // player walls collision detection
      if (x + playerSize > canvasSize) {
        stuffToDoWhenGameOver()
        return
      } else if (x < 0) {
        stuffToDoWhenGameOver()
        return
      } else if (y + playerSize > canvasSize) {
        stuffToDoWhenGameOver()
        return
      } else if (y < 0) {
        stuffToDoWhenGameOver()
        return
      }

      // RUN GAME LOOP (setInterval alternative)
      window.requestAnimationFrame(draw)
    }

    draw()
  }

  // PLAY GAME BUTTON
  const playButton = document.getElementById('playButton')
  playButton.addEventListener('click', () => {
    playGame()
  })
  // play game on when user clicks enter/return on keyboard
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      playGame()
    }
  })
}
