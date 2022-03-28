import React, {useState} from "react";
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
    return (
        <div>
            <input
                style={inputStyle}
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
        </div>
    );
}

export default AnswerBox;
