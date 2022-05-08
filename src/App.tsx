import React, {useEffect, useState} from 'react';
import './App.css';
import ProblemComponent from "./components/session";
import {Progress} from "./common/types";
import generateProblems from "./common/generate_problems";
import {Group, MantineProvider, Switch, Text} from '@mantine/core';
import {ApplicationContainer} from "./components/ApplicationContainer";


function useSession(onCompleted: () => void, state: string, hardMode: boolean) {
    const [{index: p, problems}, setProbs] = useState({index: 0, problems: generateProblems(hardMode)})
    useEffect(() => {
        if (state === "started") {
            console.log("- SESSION STARTED")
            console.log("generate problems")
            setProbs({
                index: 0,
                problems: generateProblems(hardMode),
            })
        } else {
            console.log("- SESSION ENDED")
        }
    }, [state, hardMode]);

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


const HardText = "Christian Pro 👽"
const MediumText = "William Pro 💀"

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

    const handleCompleted = () => {
        setState("completed")
    }

    const handleStart = () => {
        setState("started")
    }

    const {problem, progress, handleAnswer} = useSession(handleCompleted, state, hardMode);
    useEffect(() => {
        if (state !== "completed")
            return

        return handleEnterPressed(handleStart)
    }, [state])

    const header = (
        <>
            <Group position="apart">

                <Text size="xl" weight="bolder">
                    Vinthundsgatan 4 - Matte
                </Text>
                <Group>
                    <Text size={"xl"} weight="bold">{hardMode ? HardText : MediumText}</Text>
                </Group>
            </Group>
            <Group position="apart" pb="lg">
                <Text>Problem {progress.current} av {progress.total}</Text>
                <Switch
                    checked={hardMode} size="sm"
                    onChange={(event) => setHardMode(event.currentTarget.checked)}
                />
            </Group>
        </>
    )

    return (
        <MantineProvider>
            <ApplicationContainer header={header}>
                <Group position="center" mx="auto" direction="column" style={{
                    height: '100vh',
                }}>
                    {state === "completed" && (
                        <div onClick={handleStart}>Klicka här för att börja om!</div>
                    )}

                    {state === "started" && <ProblemComponent problem={problem} onAnswer={handleAnswer}/>}
                </Group>
            </ApplicationContainer>
        </MantineProvider>
    )
}

export default App;
