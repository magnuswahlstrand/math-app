import React from "react";
import {AnswerBox} from "./answerBox";
import {Problem} from "../common/types";
import ProblemImage from "./problemImage";
import {Group, Text} from "@mantine/core";

function ProblemBox(props: { text: string }) {

    return (<Text mx="xl" px="xl" size="xl" align="justify">{props.text}</Text>)
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
        <Group direction="column" position="center" spacing={0} mt="xl">
            {image}
            <ProblemBox text={`${problem.text}`}/>
            <AnswerBox onAnswerSubmitted={onAnswer}/>
        </Group>
    );
}

export default Session;
