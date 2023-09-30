import './App.css';
import Board from './components/Board/Board'
import {useState,useEffect} from 'react'
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import ResetButton from './components/ResetButton/ResetButton';


function App() {

  const WIN_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

    const [board,setBoard]= useState(Array(9).fill(null));
    const [xplaying, setXPlaying]= useState(true);
    const [scores, setScores]= useState({xScore: 0, oScore: 0})
    const [gameOver, setGameOver]= useState(false);

    const handleBoxClick = (boxIdx)=>{
      const updateBoard = board.map((value,idx)=>{
        if(idx=== boxIdx) {
          return xplaying=== true ? 'X' : 'O';
        }else{
          return value;
        }
      })

     const winner= checkWinner(updateBoard);
       
     //Update Scores State
     if(winner){
       if(winner=== 'O'){
         let {oScore}= scores;
         oScore +=1
         setScores({...scores, oScore})
         alert('O Wins')
       }else{
        let {xScore}= scores;
        xScore +=1
        setScores({...scores, xScore})
        alert("X Wins")

       }
     }

      setBoard(updateBoard);

      setXPlaying(!xplaying);
    }

    //Reset the Game
    const resetBoard =()=>{
      setGameOver(false)
      setBoard(Array(9).fill(null))
    }

    //Checks the Winner
    const checkWinner = (board) =>{
      for(let i=0; i< WIN_CONDITIONS.length; i++){
        const [x,y,z]= WIN_CONDITIONS[i];

        if(board[x] && board[x] === board[y] && board[y] === board[z]){
          setGameOver(true)
          return board[x];
        }
      }
    }

    //Retrieve Scores from LocalStorage
    useEffect(()=>{
      const previousScores=JSON.parse(localStorage.getItem("SCORES"))
      if(previousScores){
      setScores(previousScores)
      }
  },[])

  //Store Scores in Local Storage
    useEffect(()=>{
        localStorage.setItem("SCORES",JSON.stringify(scores))
    },[scores])

    //Clear LocalStorage
  const handleNewGame=()=>{
    localStorage.clear();
    setScores({xScore: 0, oScore: 0})
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xplaying={xplaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard={resetBoard}/>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default App;
