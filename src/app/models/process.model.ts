export interface Process{
    programmerName: string,
    operation: string,
    operator1: number,
    operator2: number,
    maximumTime: number,
    programId: number,
    result? : number
}

export interface BatchProcess{
    pendingBatches : number,
    currentBatch : Process[],
    executingProcess : Process,
    doneProcesses: Process[],
    globalCounter : number
}