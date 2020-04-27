import React, {useState} from 'react'

// global 空間を拡張
declare global {
  const React: typeof React
}

interface SquarePropsInterface {
  value: number
  onClick: () => void
}

// export default function Square(props: SquarePropsInterface) {
//   let stoneColor: string
//   switch (props.value) {
//     case 1:
//       stoneColor = 'black-stone'
//       break
//     case -1:
//       stoneColor = 'white-stone'
//       break
//     case 2:
//       stoneColor = 'can-put'
//       break
//     default:
//       stoneColor = 'no-stone'
//       break
//   }
//   return (
//     <button className="square" onClick={props.onClick}>
//       <div className={stoneColor} />
//     </button>
//   )
// }

const Square = (props: SquarePropsInterface) => {
  const [color, setColor] = useState("")
  let stoneColor: string
  switch (props.value) {
    case 1:
      stoneColor = 'black-stone'
      break
    case -1:
      stoneColor = 'white-stone'
      break
    case 2:
      stoneColor = 'can-put'
      break
    default:
      stoneColor = 'no-stone'
      break
  }
  setColor(stoneColor)
  return (
    <button className="square" onClick={props.onClick}>
      <div className={stoneColor} />
    </button>
  )
}

export default Square
