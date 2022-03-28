import React, {useState} from 'react';
import Session from "../components/session";
import generateProblems from "../common/generate_problems";


const skipStart = true

generateProblems();

const MainScreen = () => {
    const [state, setState] = useState("started")

    const onCompleted = () => {
        setState("completed")
    }

    const onStart = () => {
        setState("start")
    }

    return (
        (state === "completed"
                ? <div onClick={onStart}>Klicka här för att börja om!</div>
                : <Session onCompleted={onCompleted}/>
        )
    );
};

export default MainScreen;
