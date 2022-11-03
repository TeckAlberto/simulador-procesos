import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PCProblem } from 'src/app/models/producer-consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerConsumerService {

  private process : PCProblem;
  private value : BehaviorSubject<PCProblem>;
  
  constructor() { }

  public init() : PCProblem{
    this.process = {
      consumer: {
        role: 'Consumidor',
        working: false,
        idx: 0
      },
      producer: {
        role: 'Productor',
        working: false,
        idx: 0
      },
      turn: null,
      turnStatus: '',
      buffer: new Array(25).fill(false),
      workBufferSize: 0
    }
    return this.process;
  }

  public executeSimulator(): Observable<PCProblem> {
    this.value = new BehaviorSubject<PCProblem>(this.process);
    const observable = this.value.asObservable();

    const observer = async () => {
      while(true){
        await this.roulette();
        this.process.workBufferSize = this.randomNumber(2, 5);
        this.update();
        if(this.process.turn){  //Producer's turn

        }else{                  //Consumer's turn

        }
        // await this.delay(5000);
      }
      // value.complete();
    }

    observer();
    return observable;
  }

  private async roulette(){
    this.process.turnStatus = 'Seleccionando turno...';
    this.process.producer.working = false;
    this.process.consumer.working = false;
    this.update();

    let turn = this.process.turn || false;
    const expectedValue : boolean = Math.random() < 0.5;

    for(let i = 4; i <= 20; i++){
      this.process.turn = turn;
      this.update();
      await this.delay(Math.pow(i, 2));
      turn = !turn;
    }

    this.process.producer.working = expectedValue;
    this.process.consumer.working = !expectedValue;
    this.process.turnStatus = 'Turno del ' + (expectedValue? 'productor' : 'consumidor');
    this.process.turn = expectedValue;
    this.update();
  }

  private async delay(time: number) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  private update(){
    this.value.next(this.process);
  }

  public randomNumber(min : number = -255, max : number = 254){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
