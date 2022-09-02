import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MultiprogrammingProcess, Process } from 'src/app/models/process.model';
import { defaultOperation, functionOperations, Operation } from 'src/app/resources/operation.list';

@Injectable({
  providedIn: 'root'
})
export class BatchMultiprogrammingProcessingService {

  private processes : Process[];
  private batchSize : number;
  private batches : Process[][];
  private batch : MultiprogrammingProcess;

  constructor() { }

  public initSimulator(processes : Process[], batchSize : number) : MultiprogrammingProcess{
    this.processes = processes;
    this.batchSize = batchSize;
    this.batches = this.generateBatches();
    this.batch = {
      currentBatch: [],
      doneProcesses: [],
      executingProcess: null,
      globalCounter: 0,
      pendingBatches: this.batches.length,
      isPaused: false,
      errorFlag: false
    };
    return this.batch;
  }

  public executeSimulator() : Observable<MultiprogrammingProcess>{
    const value = new BehaviorSubject<MultiprogrammingProcess>(this.batch);
    const observable = value.asObservable();

    const observer = async() => {
      
      let batchNumber = 0;
      while(this.batches.length > 0 || this.batch.executingProcess != null){
        batchNumber++;
        this.batch.currentBatch = this.batches.shift()!;
        this.batch.pendingBatches = this.batches.length;
        
        while(this.batch.currentBatch.length > 0){
          this.batch.executingProcess = this.batch.currentBatch.shift()!;
          value.next(this.batch);

          for(let i = 1; i <= this.batch.executingProcess.maximumTime * 10; i++){
            do{
              await this.delay(100);
            }while(this.batch.isPaused);
            
            if(this.batch.errorFlag){
              break;
            }
            this.batch.executingProcess.elapsedTime! += 0.1;

            if(i % 10 == 0){
              this.batch.globalCounter++;
            }
            value.next(this.batch);
          }
          const { operator1, operation, operator2 } = this.batch.executingProcess;
          
          const f : Operation = functionOperations.get(operation) ?? defaultOperation;
          if(this.batch.errorFlag){
            this.batch.errorFlag = false; //Clear
          }else{
            this.batch.executingProcess.result = f(operator1, operator2);
          }
          this.batch.executingProcess.batchNumber = batchNumber;
          this.batch.doneProcesses.push(this.batch.executingProcess);
          value.next(this.batch);
        }
        this.batch.executingProcess = null;
      }
      value.complete();
    }

    observer();
    return observable;
  }

  public generateBatches() : Process[][]{
    let chunk : Process[] = [];
    let chunks :Process[][] = [];
    
    this.processes.forEach(process => {
      if(chunk.length == this.batchSize){
        chunks.push(chunk);
        chunk = [];
      }
      chunk.push(process);
    });

    chunks.push(chunk);

    return chunks;
  }

  public async delay(time : number){
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  public pause() : void{
    this.batch.isPaused = true;
  }

  public resume() : void{
    this.batch.isPaused = false;
  }

  public raiseError() : void {
    this.batch.errorFlag = true;
  }
}
