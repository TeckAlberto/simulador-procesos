import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BCP } from 'src/app/models/process.model';
import { defaultStatusIcon, statusIcons } from 'src/app/resources/bcp.status.list';

@Component({
  selector: 'app-bcp-extended-viewer',
  templateUrl: './bcp-extended-viewer.component.html',
  styleUrls: ['./bcp-extended-viewer.component.scss']
})
export class BcpExtendedViewerComponent implements OnInit {

  @Input() public bcps : BCP[];

  constructor(public modal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  public isValid(value : number | undefined){
    return typeof value !== 'undefined';
  }

  public getIcon(status : string) : string{
    return statusIcons.get(status) ?? defaultStatusIcon;
  }

}
