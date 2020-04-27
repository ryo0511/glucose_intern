import React from 'react'

interface ButtonPropsInterface {
  stoneCounts: () => Array<number>
  onClickPass: () => void
  onClickInit: () => void
}

export default function Button(props: ButtonPropsInterface) {
  const [black, white, nextPlayerCanPut] = props.stoneCounts()
  if (black + white === 64) {
    return <button onClick={props.onClickInit}> 最初から </button>
  }
  if (nextPlayerCanPut === 0) {
    return <button onClick={props.onClickPass}> パス </button>
  }
  return <div />
}
