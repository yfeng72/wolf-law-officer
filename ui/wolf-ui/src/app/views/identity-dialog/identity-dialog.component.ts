import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { StatusService } from '../../services';

@Component({
  selector: 'app-identity-dialog',
  templateUrl: './identity-dialog.component.html',
  styleUrls: ['./identity-dialog.component.css']
})
export class IdentityDialogComponent {

  constructor(private dialogRef: MdDialogRef<IdentityDialogComponent>, private statusService: StatusService) {

  }

  getIdentity() {
    if (!this.statusService._user.identity) {
      return "暂未获得";
    }
    return this.statusService._user.identity;
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
