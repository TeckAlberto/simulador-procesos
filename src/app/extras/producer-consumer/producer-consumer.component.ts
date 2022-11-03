import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producer-consumer',
  templateUrl: './producer-consumer.component.html',
  styleUrls: ['./producer-consumer.component.scss']
})
export class ProducerConsumerComponent implements OnInit {

  constructor(private router : Router) { }
  numbers = Array(25).fill(0).map((x,i)=>i);
  ngOnInit(): void {
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.key == 'Escape'){
      this.router.navigate(['credits']);
    }
  }

}
