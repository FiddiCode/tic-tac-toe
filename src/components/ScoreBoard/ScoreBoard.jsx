import React from 'react'
import './scoreBoard.css'

const ScoreBoard = ({scores, xplaying}) => {
    const {xScore, oScore}= scores;
  return (
    <div className='scoreBoard'>
       <span className={`score x-score ${!xplaying && 'inactive'}`}>X - {xScore}</span>
       <span className={`score o-score ${xplaying && 'inactive'}`}>O - {oScore}</span>
    </div>
  )
}

export default ScoreBoard;