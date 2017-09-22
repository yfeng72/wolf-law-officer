import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { StatusService } from '../../services';

@Component({
  selector: 'app-identity-dialog',
  templateUrl: './identity-dialog.component.html',
  styleUrls: ['./identity-dialog.component.css']
})
export class IdentityDialogComponent implements OnInit {

  private identity: string;

  constructor(@Inject(MD_DIALOG_DATA) private data: {identity: string}, private dialogRef: MdDialogRef<IdentityDialogComponent>, private statusService: StatusService) {

  }

  ngOnInit() {
    console.log(this.data.identity);
    this.identity = this.data.identity;
  }

  getIdentity() {
    if (!this.identity) {
      return "暂未获得";
    }
    return this.identity;
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
