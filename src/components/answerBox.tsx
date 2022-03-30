import React, {FormEvent, useState} from "react";
import CSS from 'csstype';


interface InputProps {
    onAnswerSubmitted: (answer: string) => boolean,
}

const inputStyle: CSS.Properties = {
    margin: '20px',
    fontSize: "1.5em",
    width: "100px",
    textAlign: "center",
}

export const AnswerBox: React.FC<InputProps> = ({onAnswerSubmitted}) => {
    const [answer, setAnswer] = useState("")
    const [wasCorrect, setWasCorrect] = useState(true)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (answer !== "") {
            const correct = onAnswerSubmitted(answer)
            setAnswer("")
            setWasCorrect(correct)
        }
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                style={{...inputStyle, backgroundColor: wasCorrect ? "white" : "salmon"}}
                type="tel"
                autoFocus
                value={answer}
                onChange={(e) => {
                    setAnswer(e.target.value)
                }}
            />
        </form>
    );
}

export default AnswerBox;
