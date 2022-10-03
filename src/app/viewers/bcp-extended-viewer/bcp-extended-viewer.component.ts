import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bcp-extended-viewer',
  templateUrl: './bcp-extended-viewer.component.html',
  styleUrls: ['./bcp-extended-viewer.component.scss']
})
export class BcpExtendedViewerComponent implements OnInit {

  constructor(public modal : NgbActiveModal) { }

  ngOnInit(): void {
  }

}
