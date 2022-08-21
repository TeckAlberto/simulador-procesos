import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public appTitle : string = '';

  constructor(private titleService : Title) { }

  ngOnInit(): void {
    this.appTitle = this.titleService.getTitle();
  }

}
