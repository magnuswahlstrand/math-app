var _ = require('lodash');


const dividedBy = (v: number) => {
    const range = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return range.map(r => {
        const m = v * r
        return {text: `${m}/${v} = ?`, answer: r}
    })
}

const multipliedBy = (v: number) => {
    const range = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return range.map(r => {
        return {text: `${v}*${r} = ?`, answer: v * r}
    })
}

const generateProblems = (n: number) => {
    return _.shuffle([
        ...multipliedBy(3),
        ...multipliedBy(4),
        ...multipliedBy(6),
        ...multipliedBy(7),
        ...dividedBy(2),
        ...dividedBy(3),
        ...dividedBy(4),
        ...dividedBy(5),
    ]).slice(0, n)
}

export default generateProblems;
