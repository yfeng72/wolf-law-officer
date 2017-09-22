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

  constructor(private callService: CallService, private statusService: StatusService, private router: Router, private mdDialog: MdDialog) {

  }

  onCreateGame() {
    this.router.navigate(['settings']);
  }

  becomeJudge(){
    this.statusService.becomeJudge().subscribe(rsp => {
      console.log('Now, you are the judge!');
    });
  }

  onCheckIdentity() {
  	this.statusService.checkIdentity();
    this.mdDialog.open(IdentityDialogComponent, {height: '80%', width: '60%'});
  }

  reStart(): Observable<void> {
  	let url = "reshuffle/";
  	return this.callService.get(url).map(rsp => {});
  }
}
