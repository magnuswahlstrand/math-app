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

const mediumProblems = [
    ...multipliedBy(5),
    ...multipliedBy(6),
    ...multipliedBy(7),
    ...dividedBy(2),
    ...dividedBy(3),
    ...dividedBy(4),
    ...dividedBy(5),
]

const hardProblems = [
    ...multipliedBy(7),
    ...multipliedBy(8),
    ...multipliedBy(9),
    ...multipliedBy(12),
    ...multipliedBy(13),
    ...dividedBy(3),
    ...dividedBy(4),
    ...dividedBy(5),
    ...dividedBy(6),
    ...dividedBy(7),
]

const generateProblems = (n: number, hard: boolean) => {
    if(hard)
        return _.shuffle(hardProblems).slice(0, n)

    return _.shuffle(mediumProblems).slice(0, n)
}

export default generateProblems;
