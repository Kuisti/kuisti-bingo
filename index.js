// lol tuli vähä kiire xdddd

const bingoCells = {
  "b": [],
  "i": [],
  "n": [],
  "g": [],
  "o": []
}

const renderCells = () => {
  renderColumn("b")
  renderColumn("i")
  renderColumn("n")
  renderColumn("g")
  renderColumn("o")
}

const loadGameData = (gameData) => {
  bingoCells.b = gameData.b
  bingoCells.i = gameData.i
  bingoCells.n = gameData.n
  bingoCells.g = gameData.g
  bingoCells.o = gameData.o

  renderCells()
}

const renderColumn = (letter) => {
  const column = document.createElement("div")
  column.classList.add("column")
  const col = bingoCells[letter]

  const letterElem = document.createElement("div")
  letterElem.classList.add("letter")
  letterElem.innerText = letter.toUpperCase()
  column.appendChild(letterElem)

  for (let i = 0; i < col.length; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    let num = col[i]
    if (num == 100) {
      num = "FREE"
    }
    cell.innerHTML = num
    column.appendChild(cell)
  }

  const cellsContainer = document.getElementById("bingoCells")
  cellsContainer.appendChild(column)
}

const disableAll = () => {
  const joinGame = document.getElementById("joinGame")
  const game = document.getElementById("game")
  const noGameRunning = document.getElementById("noGameRunning")
  const loader = document.getElementById("loader")
  const thanksForPlaying = document.getElementById("thanksForPlaying")
  const techDifficulties = document.getElementById("techDifficulties")

  joinGame.classList.add("disabled")
  game.classList.add("disabled")
  noGameRunning.classList.add("disabled")
  loader.classList.add("disabled")
  thanksForPlaying.classList.add("disabled")
  techDifficulties.classList.add("disabled")
}

const showLoader = () => {
  disableAll()
  const loader = document.getElementById("loader")
  loader.classList.remove("disabled")
}

const showGame = () => {
  disableAll()
  const game = document.getElementById("game")
  game.classList.remove("disabled")
}

const showNoGameRunning = () => {
  disableAll()
  const noGameRunning = document.getElementById("noGameRunning")
  noGameRunning.classList.remove("disabled")
}

const showJoinGame = () => {
  disableAll()
  const joinGame = document.getElementById("joinGame")
  joinGame.classList.remove("disabled")
}

const showThanksForPlaying = () => {
  disableAll()
  const thanksForPlaying = document.getElementById("thanksForPlaying")
  thanksForPlaying.classList.remove("disabled")
}

const showTechnicalDifficulties = () => {
  disableAll()
  const techDifficulties = document.getElementById("techDifficulties")
  techDifficulties.classList.remove("disabled")
}

let socket

const connectToWs = (userKey) => {
  socket = new WebSocket('wss://ictal.io')
  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "doIExist",
      content: {
        userKey
      }
    }))
  })

  socket.addEventListener("message", ({ data }) => {
    console.log(data)
    const packet = JSON.parse(data)
  
    switch (packet.type) {
      case "noGame":
        showNoGameRunning()
        break
      case "userExists":
        loadGameData(packet.userData)
        showGame()
        break;
      case "userCreated":
        loadGameData(packet.userData)
        showGame()
        break;
      case "userCreationFailed":
        showTechnicalDifficulties()
        break;
      case "userDoesNotExist":
        showJoinGame()
        break;
      case "gameEnded":
        showThanksForPlaying()
        break;
    }
  });
}

const createUser = () => {
  const userKey = getUserKey()
  let userName = 'einimeevittu'
  const nameInput = document.getElementById("userNameInput")
  if (nameInput) {
    userName = nameInput.value
  }
  if (socket) {
    socket.send(JSON.stringify({
      type: "createMe",
      content: {
        userKey,
        name: userName
      }
    }))
  }
}

const getUserKey = () => {
  const existingUserKey = localStorage.getItem("kuisti-bingo-user-key")
  if (existingUserKey) {
    return existingUserKey
  }
  const userKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  localStorage.setItem("kuisti-bingo-user-key", userKey)
  return userKey
}


document.addEventListener('DOMContentLoaded', (event) => {
  const root = document.getElementById("root")
  root.style.display = "block"

  connectToWs(getUserKey())
  showLoader()
})
