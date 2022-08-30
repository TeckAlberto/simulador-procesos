import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BatchProcess } from 'src/app/models/process.model';
import { InputService } from 'src/app/services/input.service';
import { BatchProcessingService } from 'src/app/services/simulators/batch-processing.service';

@Component({
  selector: 'app-multiprogramming',
  templateUrl: './multiprogramming.component.html',
  styleUrls: ['./multiprogramming.component.scss']
})
export class MultiprogrammingComponent implements OnInit {

  public started = false;
  public batch : BatchProcess;
  public paused = false;

  constructor(private input           : InputService,
              private batchProcessing : BatchProcessingService,
              private toastr          : ToastrService) { }

  ngOnInit(): void {
    this.batch = this.batchProcessing.initSimulator(this.input.getProcesses(), 3);
  }

  public startSimulation(){
    this.started = true;
    this.input.resetProcesses();
    this.batchProcessing.executeSimulator().subscribe({
      next: (batch) => {
        this.batch = batch;
        console.log(batch);
      },
      complete: () => {
        this.toastr.success('Todos los trabajos terminados', 'Ejecución completa');
        this.started = false;
    }});
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Tecla: ' + event.key);
    if(!this.paused){
      switch(event.key){
        case 'e':
        case 'E':
          this.toastr.warning('Interrupción por entrada/salida', 'Interrupción (E)');
          break;
        case 'w':
        case 'W':
          this.toastr.error('Error de ejecución', 'Interrupción (W)');
          break;
        case 'p':
        case 'P':
          this.toastr.info('Ejecución en pausa', 'Interrupción (P)');
          this.paused = true;
          break;
        default:
          break;
      }
    }else if(event.key == 'C' || event.key == 'c'){
      this.toastr.info('Ejecución reanudada', 'Interrupción (C)');
      this.paused = false;
    }
  }

}
