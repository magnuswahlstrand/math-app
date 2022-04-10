export type Problem = {
    text: string,
    answer: number,
    image?: {
        name: "rectangle" | "square" | "triangle",
        numbers: number[]
    },
}
export type Progress = {
    current: number,
    total: number
}
