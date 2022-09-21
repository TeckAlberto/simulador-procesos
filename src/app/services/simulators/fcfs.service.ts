import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BCP, FCFSProcess } from 'src/app/models/process.model';
import { defaultOperation, functionOperations, Operation } from 'src/app/resources/operation.list';

@Injectable({
  providedIn: 'root'
})
export class FcfsService {

  private newProcesses: BCP[];
  private process: FCFSProcess;
  private cpuMemory: number;

  public TIME_IN_BLOCK: number = 7;

  constructor() { }

  public initSimulator(processes: BCP[], cpuMemory: number): FCFSProcess {
    this.newProcesses = processes;
    this.cpuMemory = cpuMemory;
    this.process = {
      newQty: 0,
      ready: [],
      blocked: [],
      executing: null,
      finished: [],
      globalCounter: 0,
      pauseFlag: false,
      errorFlag: false,
      interruptFlag: false
    };
    return this.process;
  }

  public executeSimulator(): Observable<FCFSProcess> {
    const value = new BehaviorSubject<FCFSProcess>(this.process);
    const observable = value.asObservable();

    const observer = async () => {
      while (this.areProcessesInMemory) {

        // Asegurar que siempre que se pueda haya 3 procesos en memoria
        while (this.memoryUsed < this.cpuMemory && this.newProcesses.length > 0) {
          const newProcess = this.newProcesses.shift()!;
          newProcess.startTime = this.process.globalCounter;
          newProcess.waitTime = 0;
          this.process.ready.push(newProcess);
          this.process.newQty = this.newProcesses.length;
          value.next(this.process);
        }

        // Verificar si podemos tener un proceso ejecutándose
        if (this.process.executing == null && this.process.ready.length > 0) {
          this.process.executing = this.process.ready.shift()!;
          
          // Calculamos su tiempo de respuesta
          if (typeof this.process.executing.responseTime == 'undefined') {
            this.process.executing.responseTime = this.process.globalCounter;
            this.process.executing.elapsedTime = 0;
          }

          value.next(this.process);
        }

        // Ciclo de reloj, 10 ticks de 100ms
        for (let i = 0; i < 10; i++) {
          // En caso de estar en pausa
          do {
            await this.delay(100);
          } while (this.process.pauseFlag);
          // Salir si se produce una interrupción
          if (this.process.errorFlag || this.process.interruptFlag) {
            break;
          }
        }

        // Fin del ciclo de reloj, verificamos si el ciclo terminó por error o de forma natural

        if (this.process.errorFlag) {           //Terminó por error
          this.process.errorFlag = false;
          if(this.process.executing != null){
            this.process.executing.result = undefined;
            this.process.executing.finishTime = this.process.globalCounter;
            this.process.executing.returnTime = this.process.executing.finishTime - this.process.executing.startTime!;
            this.process.finished.push(this.process.executing);
            this.process.executing = null;
          }
        }
        else if (this.process.interruptFlag) {   // Terminó por interrupción
          this.process.interruptFlag = false;
          if(this.process.executing != null){
            this.process.executing!.timeBlocked = 0;
            this.process.blocked.push(this.process.executing!);
          }
          this.process.executing = null;
        } else {                                // Ciclo de reloj, terminó naturalmente
          this.process.globalCounter++;

          if (this.process.executing != null) { // Si no es proceso nulo
            this.process.executing!.elapsedTime += 1;

            if (this.process.executing!.elapsedTime == this.process.executing!.maximumTime) {  //Si se acabó
              const { operator1, operation, operator2 } = this.process.executing!;
              const f: Operation = functionOperations.get(operation) ?? defaultOperation;
              this.process.executing!.result = f(operator1, operator2);
              this.process.executing!.finishTime = this.process.globalCounter;
              this.process.executing!.returnTime = this.process.executing!.finishTime - this.process.executing.startTime!;

              this.process.finished.push(this.process.executing!);
              this.process.executing = null;
            }
          }

          // Sumar 1 de tiempo de espera a los procesos listos
          this.process.ready.forEach(r => r.waitTime!+=1 );

          // Actualizar procesos bloqueados
          this.process.blocked = this.process.blocked.filter(b => {
            b.timeBlocked! += 1;
            b.waitTime! += 1;
            if (b.timeBlocked == this.TIME_IN_BLOCK) {
              this.process.ready.push(b);
              return false;
            }
            
            return true;
          });

        }
        value.next(this.process);

      }
      value.complete();
    }

    observer();
    return observable;
  }

  public get memoryUsed(): number {
    let count = 0;
    if (this.process.executing != null) {
      count += 1;
    }
    count += this.process.blocked.length;
    count += this.process.ready.length;
    return count;
  }

  private get areProcessesInMemory(): boolean {
    return this.newProcesses.length > 0 || this.process.executing != null ||
      this.process.blocked.length > 0 || this.process.ready.length > 0;
  }

  private async delay(time: number) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  public pause(): void {
    this.process.pauseFlag = true;
  }

  public resume(): void {
    this.process.pauseFlag = false;
  }

  public raiseError(): void {
    this.process.errorFlag = true;
  }

  public raiseIOInterrupt(): void {
    this.process.interruptFlag = true;
  }
}
