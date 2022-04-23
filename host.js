let socket

const connectToWs = () => {
  socket = new WebSocket('wss://ictal.io')
  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "doesGameExist"
    }))
  })

  socket.addEventListener("message", ({ data }) => {
    const packet = JSON.parse(data)

    switch(packet.type) {
      case "gameExists":
        console.log("Game exists yay")
        break;
      case "gameDoesNotExist":
        console.log("Game does not exist")
        break;

      case "gameStarted":
        console.log("Game started")
        break;
    }

  })
}

const startGame = () => {
  if (!socket) return

  const hostKey = document.getElementById("hostKeyInput").value
  
  socket.send(JSON.stringify({
    type: "startGame",
    content: {
      hostKey
    }
  }))
}

const endGame = () => {
  if (!socket) return

  const hostKey = document.getElementById("hostKeyInput").value

  socket.send(JSON.stringify({
    type: "endGame",
    content: {
      hostKey
    }
  }))
}

const numbers = {
  b: [],
  i: [],
  n: [],
  g: [],
  o: []
}

const addNumber = () => {
  const allowedLetters = ['b', 'i', 'n', 'g', 'o']
  const letter = document.getElementById("letterInput").value.trim().toLowerCase()
  const number = document.getElementById("numberInput").value

  if (allowedLetters.includes(letter) && number !== null) {
    numbers[letter].push(number)
    document.getElementById("letterInput").value = ""
    document.getElementById("numberInput").value = null
    const elem = document.getElementById(letter+"Numbers")
    elem.innerHTML = numbers[letter].sort().join(", ")
  }
}

connectToWs()
