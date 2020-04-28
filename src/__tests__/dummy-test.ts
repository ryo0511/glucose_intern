import * as boardManegement from "../boardManegement.ts"

describe('calculateWinner()', () => {
  test('boardManegement', ():void => {
    const squares = boardManegement.initialBoard
    expect(boardManegement.calculateWinner(squares)).toBeNull()
  })
})

describe('countStone()', () => {
  test('boardManegement', ():void => {
    const squares = boardManegement.initialBoard
    const result = [2, 2, 0]
    expect(boardManegement.countStone(squares)).toEqual(result)
  })
})
