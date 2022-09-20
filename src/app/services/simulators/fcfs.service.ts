import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BCP, FCFSProcess, Process } from 'src/app/models/process.model';

@Injectable({
  providedIn: 'root'
})
export class FcfsService {

  private newProcesses : BCP[];
  private process : FCFSProcess;
  private cpuMemory : number;

  constructor() { }

  public initSimulator(processes : BCP[], cpuMemory : number) : FCFSProcess{
    this.newProcesses = processes;
    this.cpuMemory = cpuMemory;
    const firstProcesses : BCP[] = this.newProcesses.splice(0, this.cpuMemory);
    this.process = {
      newQty: this.newProcesses.length,
      ready: firstProcesses,
      blocked: [],
      executing: null,
      finished: [],
      globalCounter: 0,
      pauseFlag: false,
      errorFlag: false,
      interruptFlag: false
    };
    console.log(this.newProcesses);
    return this.process;
  }

  public executeSimulator() : Observable<FCFSProcess>{
    const value = new BehaviorSubject<FCFSProcess>(this.process);
    const observable = value.asObservable();

    const observer = async() => {
      value.complete();
    }

    observer();
    return observable;
  }

  public async delay(time : number){
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  public pause() : void{
    this.process.pauseFlag = true;
  }

  public resume() : void{
    this.process.pauseFlag = false;
  }

  public raiseError() : void {
    this.process.errorFlag = true;
  }

  public raiseIOInterrupt() : void{
    this.process.interruptFlag = true;
  }
}
