import { Injectable } from '@angular/core';
import { Process } from '../models/process.model';
import { enumOperations, operations } from '../resources/operation.list';

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
  
  public addRandomProcesses(count : number){
      for(let i = 0; i < count; i++){
        this.processes.push(this.getRandomProcess());
      }
  }

  public getRandomProcess(){
    const id = this.processes.length + 1;
    let randomProcess : Process;

    do{
      const operation = operations[this.randomNumber(0, operations.length - 1)]
      randomProcess = {
        programId: id,
        programmerName: 'Ivan ' + id,
        operator1: this.randomNumber(),
        operator2: this.randomNumber(),
        operation: operation.operator,
        maximumTime: this.randomNumber(1, 8)
      };
    }while(!this.validateOperation(randomProcess));

    return randomProcess;
  }

  public validateOperation(process : Process){
    const {operator1, operator2, operation} = process;
    return !(
      (operator2 == 0 && (operation == enumOperations.DIVISION || operation == enumOperations.RESIDUO)) ||
      (operator1 == 0 && operator2 == 0 && operation == enumOperations.POTENCIA)
    );
  }

  public randomNumber(min : number = -65536, max : number = 65536){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public resetProcesses(){
    this.processes = [];
  }
}
