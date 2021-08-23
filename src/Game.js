import {useState, } from "react";


const Game = () => {
    const [random, setRandom] = useState(Math.round(Math.random() * 10))
    const [guess, setGuess] = useState("")
    const [freeAttempts, setFreeAttempts] = useState(3)
    const [message, setMessage] = useState("")
    const [you, setYou] = useState( localStorage.getItem('person') || 0)
    const [bot, setBot] = useState(localStorage.getItem('computer') || 0)

    const handleInput = (e) => {
        setGuess(e.target.value)
    }

    const checkNumber = () => {
        setFreeAttempts(freeAttempts - 1)
        setFreeAttempts(0)

        if (random !== +guess && freeAttempts === 0) {
            setMessage("You Loose")
            setBot(+bot + 1)
        } else if (random === +guess) {
            setMessage("You Win")
            setYou(+you + 1)
        }
    }



    const newGame = () => {
        setFreeAttempts(3)
        setMessage('')
        setGuess('')
        setRandom(Math.round(Math.random() * 10))
    }
    const refresh = () =>{
        setMessage('')
        setGuess('')
        setYou(0)
        setBot(0)
    }
    return (
        <>
            <h1>Отгадай число</h1>
            <input value={guess} type="number" placeholder="add text" onChange={handleInput}/>

            <button onClick={checkNumber} disabled={!freeAttempts}>CHECK</button>
            <button onClick={newGame}>new game</button>
            <button onClick={refresh}>Refresh</button>
            {
                Boolean(!message) &&
                <div>У вас осталось {freeAttempts} {freeAttempts === 1 ? "попытка" : "попытки"}</div>
            }
            <div>{message}</div>
            <p>Ты:{you}</p>
            <p>Бот:{bot}</p>
        </>
    )
}

export default Game;