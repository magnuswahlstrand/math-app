import React, {useEffect, useState} from 'react';
import './App.css';
import ProblemComponent from "./components/session";
import {Progress} from "./common/types";
import generateProblems from "./common/generate_problems";


function useSession(numExercises: number, onCompleted: () => void, state: string, hardMode: boolean) {
    const [{index: p, problems}, setProbs] = useState({index: 0, problems: generateProblems(numExercises, hardMode)})
    useEffect(() => {
        if (state === "started") {
            console.log("- SESSION STARTED")
            console.log("generate problems")
            setProbs({
                index: 0,
                problems: generateProblems(numExercises, hardMode),
            })
        } else {
            console.log("- SESSION ENDED")
        }
    }, [numExercises, state, hardMode]);

    const progress: Progress = {current: p + 1, total: problems.length}
    const atEnd = p >= problems.length

    if (atEnd)
        return {
            problem: undefined,
            progress: progress,
            handleAnswer: (answer: string) => false
        }


    const handleAnswer = (answer: string) => {
        if (problems[p].answer.toString() !== answer)
            return false


        if (p === problems.length - 1) {
            onCompleted()
        } else {
            setProbs((probs) => {
                return {
                    index: probs.index + 1,
                    problems: problems,
                }
            })
        }

        return true
    }


    return {
        problem: problems[p],
        progress,
        handleAnswer
    }
}

const numProblems = 12;

const HardText = "Christian Pro 👽"
const MediumText = "William Pro 💀"

const AppHeader: React.FC<{ progress: Progress, hardMode: boolean, onToggleMode: () => void }> = (
    {
        progress, hardMode, onToggleMode,
    }) => {

    const buttonStyle = {
        "fontSize": "2em",
        "marginBottom": "10px",
        "padding": "15px",
        "width": "100%",
        "backgroundColor": "black",
        "color": "white"
    }

    const button = <button onClick={onToggleMode} style={buttonStyle}>{hardMode ? HardText : MediumText} (click
        me)</button>

    return (<header className="App-header">
        {button}
        Problem {progress.current} av {progress.total}
    </header>)
}

const handleEnterPressed = (fn: () => void) => {
    const handleEnterPressedWhenCompleted = (e: KeyboardEvent) => {
        if (e.key === 'Enter')
            fn()
    }

    window.addEventListener("keydown", handleEnterPressedWhenCompleted);
    return () => {
        window.removeEventListener("keydown", handleEnterPressedWhenCompleted);
    }
}

function App() {
    const [state, setState] = useState("started")
    const [hardMode, setHardMode] = useState(false)
    const toggleHardMode = () => setHardMode((hardMode) => !hardMode)

    const handleCompleted = () => {
        setState("completed")
    }

    const handleStart = () => {
        setState("started")
    }

    const {problem, progress, handleAnswer} = useSession(numProblems, handleCompleted, state, hardMode);
    useEffect(() => {
        if (state !== "completed")
            return

        return handleEnterPressed(handleStart)
    }, [state])

    return (
        <div className="App">
            <AppHeader progress={progress} onToggleMode={toggleHardMode} hardMode={hardMode}/>
            <header className="App-body">

                {state === "completed" && (
                    <div onClick={handleStart}>Klicka här för att börja om!</div>
                )}

                {state === "started" && <ProblemComponent problem={problem} onAnswer={handleAnswer}/>}
            </header>
        </div>
    )
}

export default App;
