const bingoCells = {
  "b": [],
  "i": [],
  "n": [],
  "g": [],
  "o": []
}

const bCells = [1, 2, 3, 4, 5]
const iCells = [6, 7, 8, 9, 10]
const nCells = [11, 12, 13, 14, 15]
const gCells = [16, 17, 18, 19, 20]
const oCells = [21, 22, 23, 24, 25]

bingoCells.b.push(...bCells)
bingoCells.i.push(...iCells)
bingoCells.n.push(...nCells)
bingoCells.g.push(...gCells)
bingoCells.o.push(...oCells)

const renderCells = () => {
  renderColumn("b", bingoCells["b"])
  renderColumn("i", bingoCells["i"])
  renderColumn("n", bingoCells["n"])
  renderColumn("g", bingoCells["g"])
  renderColumn("o", bingoCells["o"])
}

const renderColumn = (letter, col) => {
  const column = document.createElement("div")
  column.classList.add("column")

  const letterElem = document.createElement("div")
  letterElem.classList.add("letter")
  letterElem.innerText = letter.toUpperCase()
  column.appendChild(letterElem)

  for (let i = 0; i < col.length; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.innerHTML = col[i]
    column.appendChild(cell)
  }

  const cellsContainer = document.getElementById("bingoCells")
  cellsContainer.appendChild(column)
}

renderCells()