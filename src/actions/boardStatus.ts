class BoardStatus {
  xIsNext: boolean
  squares: Array<number>[]
  directionList: Array<number>[]
  constructor() {
    this.xIsNext = false
    this.squares = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, -1, 0, 0, 0],
      [0, 0, 0, -1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
    this.directionList = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ]
  }

  getSquares(): Array<number>[] {
    return this.squares
  }

  boardInit(): void {
    this.xIsNext = false
    this.squares = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, -1, 0, 0, 0],
      [0, 0, 0, -1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }

  canPut(i: number, j: number,
    stoneColor: number, squares: Array<number>[]) {
    if (squares[i][j] !== 0 && squares[i][j] !== 2) {
      return false
    }
    let isUserStone = false
    let reversedFlag = false
    let reversedLineCount = 0
    for (const direction of this.directionList) {
      let x = j
      let y = i
      isUserStone = false
      reversedFlag = false
      while (true) {
        x += direction[0]
        y += direction[1]
        if (x < 0 || 7 < x || y < 0 || 7 < y) {
          break
        }
        if (squares[y][x] === 0 || squares[y][x] === 2) {
          break
        }
        if (squares[y][x] === stoneColor) {
          isUserStone = true
          break
        }
        reversedFlag = true
      }
      if (!reversedFlag || !isUserStone) {
      } else {
        reversedLineCount += 1
      }
    }
    if (reversedLineCount > 0) {
      squares[i][j] = 2
      return true
    } else {
      squares[i][j] = 0
      return false
    }
  }

  reverseEightLine(i: number, j: number,
    stoneColor: number, squares: Array<number>[]) {
    if (squares[i][j] !== 2) {
      return false
    }
    let isUserStone = false
    let reversedFlag = false
    let reversedLineCount = 0
    for (const direction of this.directionList) {
      const squaresBackUp = JSON.parse(JSON.stringify(squares))
      let x = j
      let y = i
      isUserStone = false
      reversedFlag = false
      while (true) {
        x += direction[0]
        y += direction[1]
        if (x < 0 || 7 < x || y < 0 || 7 < y) {
          break
        }
        if (squares[y][x] === 0 || squares[y][x] === 2) {
          break
        }
        if (squares[y][x] === stoneColor) {
          isUserStone = true
          break
        }
        squares[y][x] = stoneColor
        reversedFlag = true
      }
      if (!reversedFlag || !isUserStone) {
        squares = squaresBackUp
      } else {
        reversedLineCount += 1
      }
    }
    if (reversedLineCount > 0) {
      squares[i][j] = stoneColor
      return squares
    }
    return false
  }
  countStone(squares: Array<number>[]) {
    let black: number = 0
    let white: number = 0
    let canPutPlace: number = 0

    for (const values of squares) {
      for (const value of values) {
        if (value === 1) {
          black++
        } else if (value === -1) {
          white++
        } else if (value === 2) {
          canPutPlace++
        }
      }
    }

    return [black, white, canPutPlace]
  }

  calculateWinner(squares: Array<number>[]) {
    const [black, white] = this.countStone(squares)
    const stoneCount = black + white
    if (stoneCount === 64 || black === 0 || white === 0) {
      if (black < white) {
        return '白の勝利！'
      }
      if (black === white) {
        return '引き分け'
      }
      return '黒の勝利！'
    }
    return null
  }

  pass() {
    this.xIsNext = !this.xIsNext
  }
}

const boardStatus = new BoardStatus()
export default boardStatus
