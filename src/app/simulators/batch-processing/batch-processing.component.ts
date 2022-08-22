import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BatchProcess } from 'src/app/models/process.model';
import { InputService } from 'src/app/services/input.service';
import { BatchProcessingService } from 'src/app/services/simulators/batch-processing.service';

@Component({
  selector: 'app-batch-processing',
  templateUrl: './batch-processing.component.html',
  styleUrls: ['./batch-processing.component.scss']
})
export class BatchProcessingComponent implements OnInit {

  public started = false;
  public batch : BatchProcess;

  constructor(private input           : InputService,
              private batchProcessing : BatchProcessingService) { }

  ngOnInit(): void {
    this.batch = this.batchProcessing.initSimulator(this.input.getProcesses(), 3);
  }

  public startSimulation(){
    this.started = true;
    this.batchProcessing.executeSimulator().subscribe({
      next: (batch) => {
        this.batch = batch;
        console.log(batch);
      },
    complete: () => {
    }});
  }

}
