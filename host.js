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

connectToWs()
