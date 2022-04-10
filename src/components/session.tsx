import React from "react";
import {AnswerBox} from "./answerBox";
import {Problem} from "../common/types";
import ProblemImage from "./problemImage";

function ProblemBox(props: { text: string }) {
    return (<div style={{fontSize: "2em"}}>
        {props.text}
    </div>);
}

interface InputProps {
    problem?: Problem
    onAnswer: (answer: string) => boolean;
}


const Session: React.FC<InputProps> = ({problem = null, onAnswer}) => {
    if (!problem) {
        return <></>
    }

    let image = <></>
    if (problem.image) {
        image = <ProblemImage {...problem.image} />
    }

    return (
        <>
            {image}
            <ProblemBox text={`${problem.text}`}/>
            <AnswerBox onAnswerSubmitted={onAnswer}/>
        </>
    );
}

export default Session;
