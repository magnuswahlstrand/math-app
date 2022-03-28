import React, {useState} from "react";
import {Problem} from "../common/types";
import {AnswerBox} from "./answerBox";
import generateProblems from "../common/generate_problems";

function ProblemBox(props: { text: string }) {
    return (<div style={{fontSize: "2em"}}>
        {props.text}
    </div>);
}

interface InputProps {
    onCompleted: () => void;
}

function useSession(problems: Problem[], onCompleted: () => void) {
    const [p, setProblemIndex] = useState(0)
    const atEnd = p >= problems.length

    if (atEnd)
        return {
            text: "", handleAnswer: (answer: string) => false
        }


    const handleAnswer = (answer: string) => {
        if (problem.answer.toString() !== answer)
            return false


        // Correct
        if (p === problems.length - 1) {
            console.log("call on end")
            onCompleted()
        }
        setProblemIndex(p + 1)
        return true
    }


    const problem = problems[p] ?? [];
    return {text: problem.text, handleAnswer};
}

const numProblems = 10;

const Session: React.FC<InputProps> = ({onCompleted}) => {
    const {text, handleAnswer} = useSession(generateProblems(numProblems), onCompleted);

    if (text === "") {
        return (<div></div>)
    }


    return (
        <>
            <ProblemBox text={text}/>
            <AnswerBox onAnswerSubmitted={handleAnswer}/>
        </>
    );
}

export default Session;
