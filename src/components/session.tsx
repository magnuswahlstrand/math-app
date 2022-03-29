import React from "react";
import {AnswerBox} from "./answerBox";
import {Problem} from "../common/types";

function ProblemBox(props: { text: string }) {
    return (<div style={{fontSize: "2em"}}>
        {props.text}
    </div>);
}

interface InputProps {
    problem?: Problem
    onAnswer: (answer: string) => boolean;
}


const Session: React.FC<InputProps> = ({problem= null, onAnswer}) => {
    if(!problem) {
        return <></>
    }

    return (
        <>
            <ProblemBox text={`${problem.text}`}/>
            <AnswerBox onAnswerSubmitted={onAnswer}/>
        </>
    );
}

export default Session;
