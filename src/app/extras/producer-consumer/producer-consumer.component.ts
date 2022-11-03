import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PCProblem } from 'src/app/models/producer-consumer.model';
import { ProducerConsumerService } from 'src/app/services/simulators/producer-consumer.service';

@Component({
  selector: 'app-producer-consumer',
  templateUrl: './producer-consumer.component.html',
  styleUrls: ['./producer-consumer.component.scss']
})
export class ProducerConsumerComponent implements OnInit {
  numbers = Array(25).fill(0).map((x,i)=>i);
  public process : PCProblem;
  
  constructor(private router  : Router,
              private pc      : ProducerConsumerService) { }
  
  ngOnInit(): void {
    this.process = this.pc.init();
    this.pc.executeSimulator().subscribe({
      next: (value) => {
        this.process = value;
        console.log(value);
      }
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.key == 'Escape'){
      this.router.navigate(['credits']);
    }
  }

}
