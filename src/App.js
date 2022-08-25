import React from "react"

import StartScreen from "./components/StartScreen"
import Quiz from "./components/Quiz"

export default function App(){
    const [gameStart, setGameStart] = React.useState(false)

    function startGame(){
        setGameStart(prevState => prevState=true)
    }

    return (
        <main>
            {gameStart ? <Quiz/> : <StartScreen onClick={startGame}/>}
        </main>
    )
}