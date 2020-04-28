import * as bm from '../actions/boardManegement.ts'
import boardStatus from '../actions/boardStatus.ts'

describe('boardStatus', () => {
  test('test', ():void => {
    const squares = boardStatus.squares
    for (var i=0; i<8; i++) {
      for (var j=0; j<8; j++) {
        boardStatus.canPut(i,j,-1,squares)
      }
    }
    const newSquares = boardStatus.reverseEightLine(5,4,-1,squares)
    // expect(newSquares).toBeFalsy()
    expect(newSquares).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 2, 1, -1, 0, 0, 0],
      [0, 0, 0, -1, -1, 2, 0, 0],
      [0, 0, 0, 0, -1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ])
  })

  test('test', ():void => {
    expect(boardStatus.xIsNext).toBeFalsy()
  })
})

describe('boardManegement', () => {
  test('calculateWinner()', ():void => {
    const squares = bm.initialBoard
    expect(bm.calculateWinner(squares)).toBeNull()
  })

  test('countStone()', ():void => {
    const squares = bm.initialBoard
    const result = [2, 2, 0]
    expect(bm.countStone(squares)).toEqual(result)
  })
})
