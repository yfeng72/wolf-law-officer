import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { User, Settings } from './models';
import { CallService, StatusService } from './services';
import { IdentityDialogComponent } from './views/identity-dialog';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {

  private user: User;

  constructor(private callService: CallService, private statusService: StatusService, private router: Router, private mdDialog: MdDialog) {
    this.user = this.statusService._user;
  }

  onCreateGame() {
    this.router.navigate(['settings']);
  }

  becomeJudge(){
    return this.statusService.becomeJudge().subscribe(rsp => {
      console.log('Now, you are the judge!');
    });
  }

  onCheckIdentity() {
  	return this.statusService.checkIdentity().subscribe(rsp => {
      console.log(rsp);
      this.mdDialog.open(IdentityDialogComponent, {height: '80%', width: '60%', data: {indetity: rsp}});
    });
  }

  onReStart() {
  	this.statusService.reStart().subscribe(rsp => {});
  }
}
