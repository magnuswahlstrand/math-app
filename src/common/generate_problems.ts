import {Problem} from "./types";

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

function generate_averages(n_problems: number, n_numbers: number) {
    let targets = []
    for (let i = 0; i < n_problems; i++) {
        targets.push(_.random(1, 8))
    }
    const targets_and_numbers = targets.map(target => {
        let vs = Array(n_numbers).fill(target)

        // Start with all values equal to the target average [4,4,4,4]

        // Increase and decrease the numbers a bit, while keeping the average the same
        for (let i = 0; i < 30; i++) {
            const i1 = _.random(0, n_numbers - 1)
            const i2 = _.random(0, n_numbers - 1)

            // Keep values above 0
            if (vs[i2] <= 1)
                continue

            vs[i1]++
            vs[i2]--
        }

        return {numbers: vs, target: target}
    })
    return targets_and_numbers;
}

function joinWithAnd(numbers: any[]) {
    return numbers.slice(0, -1).join(', ') + " och " + numbers[numbers.length - 1];
}

const averageOf = (n_numbers: number, n_problems: number) => {
    const targets_and_numbers = generate_averages(n_problems, n_numbers);

    return targets_and_numbers.map(p => {
        let text = joinWithAnd(p.numbers)
        return {text: `Vad är medelvärdet av ${text}?`, answer: p.target}
    })
}

const missingAverageOf = (n_numbers: number, n_problems: number) => {
    const targets_and_numbers = generate_averages(n_problems, n_numbers);
    const persons = ['Anna', 'Bella', 'Christian', 'Didrik']

    return targets_and_numbers.map(p => {
        const names = joinWithAnd(persons.slice(0, n_numbers))
        const names_and_ages = _.zip(p.numbers, persons)
        const hint = names_and_ages.slice(0, -1).map((v: [number, string]) => {
            return v[1] + ' är '  + v[0]
        }).join('. ')
        let [answer, name] = names_and_ages[names_and_ages.length - 1]
        return {text: `${names}s ålder har medelvärdet ${p.target}. ${hint} Hur gammal är ${name}?`, answer: answer}
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

type ShapeName = "rectangle" | "square" | "triangle"

const generateSquares: () => Shape[] = () => {
    return _.times(6, () => {
        const s = _.random(9, 16)
        const name: ShapeName = "square"

        return {
            circumference: 4 * s,
            area: s * s,
            type: name,
            sides: [s, s, s, s]
        }
    })
}

const generateRectangles: () => Shape[] = () => {
    return _.times(6, () => {
        const s1 = _.random(9, 20)
        const s2 = _.random(7, 12)
        const name: ShapeName = "rectangle"

        return {
            circumference: 2 * (s1 + s2),
            area: s1 * s2,
            type: name,
            sides: [s1, s2, s1, s2]
        }
    })
}
const generateTriangles: () => Shape[] = () => {
    return _.times(6, () => {
        const [a, b, c] = _.sample([
            [3, 4, 5],
            [5, 12, 13],
            [7, 24, 25],
        ])

        const name: ShapeName = "triangle"

        return {
            circumference: c + b + a,
            area: b * a / 2,
            type: name,
            sides: [c, b, a]
        }
    })
}

type Shape = {
    circumference: number,
    area: number,
    type: ShapeName
    sides: number[]
}

const geometric = () => {
    let shapes: Shape[] = []
    shapes = shapes.concat(...generateSquares())
    shapes = shapes.concat(...generateRectangles())
    shapes = shapes.concat(...generateTriangles())

    let problems: Problem[] = []

    // Squares
    shapes.forEach(s => {
        const image = {
            name: s.type,
            numbers: s.sides
        }

        problems.push({
            text: "Hur stor är omkretsen?",
            answer: s.circumference,
            image: image,
        })

        problems.push({
            text: "Hur stor är arean?",
            answer: s.area,
            image: image,
        })
    })

    return problems
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
    ...averageOf(4, 10),
    ...averageOf(5, 3),
    ...missingAverageOf(3, 10),
    ...missingAverageOf(4, 10),
    ...geometric(),
]

const numProblems = 12;
const numHardProblems = 16;

const generateProblems = (hard: boolean) => {


    if (hard)
        return _.shuffle(hardProblems).slice(0, numHardProblems)

    return _.shuffle(mediumProblems).slice(0, numProblems)
}

export default generateProblems;
