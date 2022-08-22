import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BatchProcess, Process } from 'src/app/models/process.model';

@Injectable({
  providedIn: 'root'
})
export class BatchProcessingService {

  private processes : Process[];
  private batchSize : number;
  private batches : Process[][];
  private batch : BatchProcess;

  constructor() { }

  public initSimulator(processes : Process[], batchSize : number) : BatchProcess{
    this.processes = processes;
    this.batchSize = batchSize;
    this.batches = this.generateBatches();
    this.batch = {
      currentBatch: [],
      doneProcesses: [],
      executingProcess: null,
      globalCounter: 0,
      pendingBatches: this.batches.length
    };
    return this.batch;
  }

  public executeSimulator() : Observable<BatchProcess>{
    const value = new BehaviorSubject<BatchProcess>(this.batch);
    const observable = value.asObservable();

    const observer = async() => {

      while(this.batches.length > 0 || this.batch.currentBatch != null){
        this.batch.currentBatch = this.batches.shift()!;
        this.batch.pendingBatches = this.batches.length;
        
        while(this.batch.currentBatch.length > 0){
          this.batch.executingProcess = this.batch.currentBatch.shift()!;
          value.next(this.batch);

          for(let i = 0; i < this.batch.executingProcess.maximumTime; i++){
            await this.delay(1000);
            this.batch.globalCounter++;
            value.next(this.batch);
          }
          
          this.batch.doneProcesses.push(this.batch.executingProcess);
          value.next(this.batch);
        }
      }
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
}
