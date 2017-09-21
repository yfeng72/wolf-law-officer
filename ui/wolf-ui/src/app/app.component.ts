import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User, Settings } from './models';
import { CallService } from './services';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _user: User = {
  	userId: -1,
  	identity: null,
  	isLawOfficer: false,
  	checkedIdentity: false
  };
  private currentSettings: Settings;

  constructor(private callService: CallService, private router: Router) {

  }

  onCreateGame() {
    this.router.navigate(['settings']);
  }

  becomeJudge(){
  	this._user.isLawOfficer = true;
  	let url = "becomeLawOfficer/" + this._user.userId;
  	this.callService.get(url).map(rsp => {}).subscribe(rsp => {
      console.log("Now, you are the judge.");
  	})
  }

  onCheckIdentity() {
  	this._user.checkedIdentity = true;
  	let url = "getIdentity/" + this._user.userId;
  	this.callService.get(url).map(rsp => rsp as string).subscribe(rsp => console.log(rsp));
  }

  reStart(): Observable<void> {
  	let url = "reshuffle/";
  	return this.callService.get(url).map(rsp => {});
  }

  onCheckNightInfo(): Observable<number[]> {
  	let url = "lastNightInfo/";
  	return this.callService.get(url).map(rsp => rsp as number[]);
  }

  onStart(): Observable<boolean> {
  	let url = "startGame/";
  	return this.callService.get(url).map(rsp => rsp as boolean);
  }
}
