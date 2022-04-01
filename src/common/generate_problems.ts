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

const vehicles = () => {
    const vehicles = [
        {name: "cykel", name2: "cyklar", wheels: 2},
        {name: "trehjuling", name2: "trehjulingar", wheels: 3},
        {name: "bil", name2: "bilar", wheels: 4},
    ]

    return vehicles.map(v => {
        const amount = _.random(21, 31)
        const text = `En ${v.name} har ${v.wheels} hjul. Hur många hjul har ${amount} st ${v.name2}?`
        return {text: `${text}`, answer: amount * v.wheels}
    })
}

const stuff = () => {
    const stuff = [
        "cyklar",
        "pennor",
        "dockor",
        "TV-spel",
        "leksaker",
    ]

    return stuff.map(v => {
        const base = _.random(2, 5)
        const cost_per = _.random(3, 12)
        const initial_cost = base * cost_per;

        const target = _.random(3, 9)
        const target_cost = target * cost_per;

        const text = `${base} ${v} kostar ${initial_cost} kr. Hur mycket kostar ${target} ${v}?`
        return {text: `${text}`, answer: target_cost}
    })
}


const mediumProblems = [
    ...stuff(),
    ...vehicles(),
    ...multipliedBy(5),
    ...multipliedBy(6),
    ...multipliedBy(7),
    ...dividedBy(2),
    ...dividedBy(3),
    ...dividedBy(4),
    ...dividedBy(5),
]

const hardProblems = [
    ...stuff(),
    ...vehicles(),
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
    if (hard)
        return _.shuffle(hardProblems).slice(0, n)

    return _.shuffle(mediumProblems).slice(0, n)
}

export default generateProblems;
