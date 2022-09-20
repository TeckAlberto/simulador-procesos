export interface Process{
    programmerName: string,
    operation: string,
    operator1: number,
    operator2: number,
    maximumTime: number,
    programId: number,
    result? : number,
    batchNumber? : number,
    elapsedTime : number
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
    pauseFlag : boolean,
    errorFlag: boolean,
    interruptFlag : boolean
}

export interface BCP{
    operation: string,
    operator1: number,
    operator2: number,
    maximumTime: number,
    programId: number,
    result? : number,
    elapsedTime : number,
    startTime? : number,
    finishTime? : number,

}
export interface FCFSProcess {
    newQty : number,
    globalCounter : number,
    ready : BCP[],
    executing : BCP | null,
    blocked: BCP[],
    finished : BCP[],
    pauseFlag : boolean,
    errorFlag : boolean,
    interruptFlag : boolean,
}