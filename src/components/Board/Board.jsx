import React from 'react'
import "./board.css"
import Box from '../Box/Box'

const Board = ({board, onClick}) => {
  return (
    <div className='board'>
        {board.map((value,i)=>{
         return <Box key={i} value={value} onClick={()=>value===null && onClick(i)}/>
       })}
  </div>
  )
}

export default Board;