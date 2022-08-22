import { Injectable } from '@angular/core';
import { Process } from 'src/app/models/process.model';

@Injectable({
  providedIn: 'root'
})
export class BatchProcessingService {

  public processes : Process[];
  public batchSize : number;
  public batches : Process[][];

  constructor() { }

  public initSimulator(processes : Process[], batchSize : number){
    this.processes = processes;
    this.batchSize = batchSize;
    this.batches = this.generateBatches();

    console.log(this.batches);
  }

  public executeSimulator(){

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
}
