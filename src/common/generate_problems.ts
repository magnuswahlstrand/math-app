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

const averageOf = (n_numbers: number, n_problems: number) => {
    let targets = []
    for (let i = 0; i < n_problems; i++) {
        targets.push(_.random(1, 6))
    }
    const targets_and_numbers = targets.map(target => {
        let vs = Array(n_numbers).fill(target)

        // Start with all values equal to the target average [4,4,4,4]

        // Increase and decrease the numbers a bit, while keeping the average the same
        for (let i = 0; i < 20; i++) {
            const i1 = _.random(0, n_numbers - 1)
            const i2 = _.random(0, n_numbers - 1)

            // Avoid negative values
            if (vs[i2] < 1)
                continue

            vs[i1]++
            vs[i2]--
        }

        return {numbers: vs, target: target}
    })

    return targets_and_numbers.map(p => {
        var text = p.numbers.slice(0, -1).join(', ') + " och " + p.numbers[p.numbers.length - 1]
        return {text: `Vad är medelvärdet av ${text}?`, answer: p.target}
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
    ...multipliedBy(8),
    ...multipliedBy(11),
    ...multipliedBy(12),
    ...dividedBy(3),
    ...dividedBy(4),
    ...dividedBy(5),
    ...dividedBy(6),
]

const hardProblems = [
    ...stuff(),
    ...multipliedBy(7),
    ...multipliedBy(8),
    ...multipliedBy(9),
    ...multipliedBy(12),
    ...multipliedBy(13),
    ...dividedBy(6),
    ...dividedBy(7),
    ...dividedBy(8),
    ...dividedBy(9),
    ...averageOf(2, 10),
    ...averageOf(3, 10),
    ...averageOf(4, 2),
]

const numProblems = 12;
const numHardProblems = 16;

const generateProblems = (hard: boolean) => {


    if (hard)
        return _.shuffle(hardProblems).slice(0, numHardProblems)

    return _.shuffle(mediumProblems).slice(0, numProblems)
}

export default generateProblems;
