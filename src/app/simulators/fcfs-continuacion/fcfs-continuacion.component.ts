import { Component, HostListener, OnInit, Type } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BCP, FCFSProcess } from 'src/app/models/process.model';
import { BcpViewerService } from 'src/app/services/bcp-viewer.service';
import { InputService } from 'src/app/services/input.service';
import { FcfsService } from 'src/app/services/simulators/fcfs.service';
import { BcpExtendedViewerComponent } from 'src/app/viewers/bcp-extended-viewer/bcp-extended-viewer.component';

@Component({
  selector: 'app-fcfs-continuacion',
  templateUrl: './fcfs-continuacion.component.html',
  styleUrls: ['./fcfs-continuacion.component.scss']
})
export class FcfsContinuacionComponent implements OnInit {

  public started = false;
  public paused = false;
  public finished = false;
  public process : FCFSProcess;
  private modalRef : NgbModalRef | null;

  private PROCESS_IN_MEMORY = 3;

  constructor(private input   : InputService,
              private fcfs    : FcfsService,
              private toastr  : ToastrService,
              private bcps    : BcpViewerService,
              private modal   : NgbModal) { }

  ngOnInit(): void {
    this.process = this.fcfs.initSimulator(this.input.getProcessesAsBCP(), this.PROCESS_IN_MEMORY);
  }

  public startSimulation(){
    this.started = true;
    this.input.resetProcesses();
    this.fcfs.executeSimulator().subscribe({
      next: (process) => {
        this.process = process;
        console.log(this.process);
      },
      complete: () => {
        this.toastr.success('Todos los trabajos terminados', 'Ejecución completa');
        // this.started = false;
        this.finished = true;
        this.bcps.fcfsToBCP(this.process);
    }});
  }

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Tecla: ' + event.key);
    if(!this.paused){
      switch(event.key){
        case 'e':
        case 'E':
          this.toastr.warning('Interrupción por entrada/salida', 'Interrupción (E)');
          this.fcfs.raiseIOInterrupt();
          break;
        case 'w':
        case 'W':
          this.toastr.error('Error de ejecución', 'Interrupción (W)');
          this.fcfs.raiseError();
          break;
        case 'p':
        case 'P':
          this.toastr.info('Ejecución en pausa', 'Interrupción (P)');
          this.paused = true;
          this.fcfs.pause();
          break;
        case 'b':
        case 'B':
          this.modalRef = this.modal.open(BcpExtendedViewerComponent);
          this.modalRef.componentInstance.bcps = [];
          this.paused = true;
          this.fcfs.pause();
          break;
        case 'n':
        case 'N':
          this.toastr.success('Se ha agregado un nuevo proceso', 'Proceso agregado');
          this.fcfs.addRandomProcess();
          break;
        default:
          break;
      }
    }else if(event.key == 'C' || event.key == 'c'){
      this.toastr.info('Ejecución reanudada', 'Interrupción (C)');
      this.paused = false;
      this.fcfs.resume();
      if(this.modalRef){
        this.modalRef.dismiss('Closed');
        this.modalRef = null;
      }
    }
  }

  public getBlockedTime(){
    return this.fcfs.TIME_IN_BLOCK;
  }

  public viewBCPS(){
    this.bcps.viewBCP();
  }

  public getMemoryUsed(){
    return this.fcfs.memoryUsed;
  }
  
}
