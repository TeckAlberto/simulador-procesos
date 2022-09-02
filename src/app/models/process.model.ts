export interface Process{
    programmerName: string,
    operation: string,
    operator1: number,
    operator2: number,
    maximumTime: number,
    programId: number,
    result? : number,
    batchNumber? : number,
    elapsedTime? : number
}

export interface BatchProcess{
    pendingBatches : number,
    currentBatch : Process[],
    elapsedTime : number,
    executingProcess : Process | null,
    doneProcesses: Process[],
    globalCounter : number
}

export interface MultiprogrammingProcess{
    pendingBatches : number,
    currentBatch : Process[],
    executingProcess : Process | null,
    doneProcesses: Process[],
    globalCounter : number,
    isPaused : boolean,
    errorFlag: boolean
}