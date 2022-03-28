import React, {useState} from "react";

interface InputProps2 {
    onAnswerSubmitted: (answer: string) => boolean,
}

export const AnswerBox: React.FC<InputProps2> = ({onAnswerSubmitted}) => {
    const [answer, setAnswer] = useState("")
    return (
        <input
            type="tel"
            autoFocus
            value={answer}
            onChange={(e) => {
                setAnswer(e.target.value)
            }}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    const correct = onAnswerSubmitted(answer)
                    if (correct)
                        setAnswer("")
                }
            }}/>
    );
}

export default AnswerBox;
