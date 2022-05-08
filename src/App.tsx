import React, {useEffect, useState} from 'react';
import './App.css';
import ProblemComponent from "./components/session";
import {Progress} from "./common/types";
import generateProblems from "./common/generate_problems";
import {Badge, Group, MantineProvider, Switch, Text} from '@mantine/core';
import {ApplicationContainer} from "./components/ApplicationContainer";
import moment from "moment/moment";


function useSession(onCompleted: () => void, state: string, hardMode: boolean) {
    const [startedAt, setStartedAt] = useState(moment()) // TODO: Not a good way of doing this
    const [{index: p, problems}, setProbs] = useState({index: 0, problems: generateProblems(hardMode)})
    useEffect(() => {
        if (state === "started") {
            console.log("- SESSION STARTED")
            console.log("generate problems")
            setProbs({
                index: 0,
                problems: generateProblems(hardMode),
            })
            setStartedAt(moment())
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
            setStartedAt(moment())
        }

        return true
    }


    return {
        problem: problems[p],
        progress,
        startedAt,
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

function useNow() {
    const [now, setNow] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(() => moment());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return now;
}

function totalTime(now: moment.Moment, startedAt?: moment.Moment) {
    var duration = moment.duration(now.diff(startedAt));
    const seconds = duration.seconds()
    const minutes = duration.minutes()
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function App() {
    const now = useNow()
    const [state, setState] = useState("started")
    const [hardMode, setHardMode] = useState(false)

    const handleCompleted = () => {
        setState("completed")
    }

    const handleStart = () => {
        setState("started")
    }

    const {problem, progress, startedAt, handleAnswer} = useSession(handleCompleted, state, hardMode);
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
                    <Switch
                        checked={hardMode} size="sm"
                        onChange={(event) => setHardMode(event.currentTarget.checked)}
                    />
                </Group>
            </Group>
        </>
    )

    const t = state === "completed" ? "--" : totalTime(now, startedAt);

    const footer = (<Group position="left" spacing="xs">
        <Text>⏲️</Text><Text weight="bold">Tid:</Text><Text>{t}</Text>
    </Group>)

    return (
        <MantineProvider>
            <ApplicationContainer header={header} footer={footer}>

                <Group position="center" mx="auto" direction="column" style={{
                    // height: '100vh',
                }}>
                    <Badge>Problem {progress.current} av {progress.total}</Badge>
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
