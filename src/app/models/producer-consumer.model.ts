export interface Subject{
    role : string,
    working: boolean
    idx : number,
}

export interface PCProblem{
    producer : Subject,
    consumer: Subject,
    turn: boolean | null,
    turnStatus : string,
    buffer: boolean[],
    workBufferSize : number,
}