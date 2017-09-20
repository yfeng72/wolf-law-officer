import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User, Settings } from './models';
import { CallService } from './services';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private _user: User = {
  	userId: 1,
  	identity: null,
  	isLawOfficer: false,
  	checkedIdentity: false
  };
  private currentSettings: Settings;

  constructor(private callService: CallService) {

  }

  onCreateGame() {
  	let mockData: Settings = {
  		numPlayers: 6,
  		numWolves: 2,
  		hasHunter: false,
  		hasDumbass: false
  	}
  	console.log(this.callService.generateQuery(mockData))
  	let url = "createGame/" + this.callService.generateQuery(mockData);
  	this.callService.get(url).map(rsp => rsp.json() as Settings).subscribe(settings => this.currentSettings = settings)
  }

  becomeJudge(){
  	this._user.isLawOfficer = true;
  	let url = "becomeLawOfficer/" + this._user.userId;
  	this.callService.get(url).map(rsp => {}).subscribe(rsp => {

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
