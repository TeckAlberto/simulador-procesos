import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BCP, Process } from '../models/process.model';
import { ENUM_OPERATIONS, operations } from '../resources/operation.list';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private processes: Process[];

  constructor(private route : ActivatedRoute) {
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
        maximumTime: this.randomNumber(6, 16),
        elapsedTime: 0
      };
    }while(!this.validateOperation(randomProcess));

    return randomProcess;
  }

  public validateOperation(process : Process){
    const {operator1, operator2, operation} = process;
    return !(
      (operator2 == 0 && (operation == ENUM_OPERATIONS.DIVISION || operation == ENUM_OPERATIONS.RESIDUO)) ||
      (operator1 == 0 && operator2 == 0 && operation == ENUM_OPERATIONS.POTENCIA)
    );
  }

  public randomNumber(min : number = -254, max : number = 255){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public resetProcesses(){
    this.processes = [];
  }

  public nextRoute() : string[]{
    let child = this.route.firstChild;

    while (child?.firstChild) {
      child = child.firstChild;
    }
    
    return child?.snapshot.data['redirect'] ?? [''];
  }

  public getProcessesAsBCP() : BCP[]{
    return this.processes.map(p => {
      return {
        elapsedTime: p.elapsedTime,
        maximumTime: p.maximumTime,
        operation: p.operation,
        operator1: p.operator1,
        operator2: p.operator2,
        programId: p.programId,
        result: p.result
      }
    });
  }
}
