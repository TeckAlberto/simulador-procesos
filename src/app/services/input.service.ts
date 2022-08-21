import { Injectable } from '@angular/core';
import { Process } from '../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private processes: Process[];

  constructor() {
    this.processes = [];
   }

  public addProgram(process : Process){
    this.processes.push(process);
  }

  public isIDUnique(id : number){
    return this.processes.filter(p => p.programId == id).length === 0;
  }

  public getProcesses(){
    return this.processes;
  }

}
