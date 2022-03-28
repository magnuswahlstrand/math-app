import {Problem} from "./types";

var _ = require('lodash');


let problems: Problem[] = [
    {text: "18 / 3 = ?", answer: 6},
    // {text: "12 * 4 = ?", answer: 48}
]

const dividedBy = (v: number) => {
    const range = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return range.map(r => {
        const m = v * r
        return {text: `${m}/${v} = ?`, answer: r}
    })
}

const generateProblems = () => {

    return _.shuffle([
        ...dividedBy(3),
        ...dividedBy(4)
    ])
}

export default generateProblems;
