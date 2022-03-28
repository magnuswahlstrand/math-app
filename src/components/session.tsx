import React, {useState} from "react";
import {Problem} from "../common/types";
import {AnswerBox} from "./answerBox";
import generateProblems from "../common/generate_problems";

function ProblemBox(props: { text: string }) {
    return (<div>
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
        console.log('submit')
        // Correct
        if (problem.answer.toString() === answer) {
            if (p === problems.length - 1) {
                console.log("call on end")
                onCompleted()
            }

            setProblemIndex(p + 1)
            return true
        } else {
            return false
        }
    }


    const problem = problems[p] ?? [];
    return {text: problem.text, handleAnswer};
}

const Session: React.FC<InputProps> = ({onCompleted}) => {
    const {text, handleAnswer} = useSession(generateProblems(), onCompleted);

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
