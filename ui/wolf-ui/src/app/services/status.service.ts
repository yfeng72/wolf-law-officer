import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models';
import { CallService } from './call.service';

@Injectable()
export class StatusService {

	_user: User;

	constructor(private callService: CallService) {
		this._user = {
	  		userId: -1,
	  		identity: null,
	  		isLawOfficer: false,
	  		checkedIdentity: false
  		};
	}

	getId(id: number) {
		this._user.userId = id;
	}

	becomeJudge() {
		this._user.isLawOfficer = true;
  		let url = "becomeLawOfficer/" + this._user.userId;
  		return this.callService.get(url).map(rsp => {});
	}

	checkIdentity() {
		if (this._user.userId < 0) return;
		let url = "getIdentity/" + this._user.userId;
  		return this.callService.get(url).map(rsp => rsp as string).subscribe(rsp =>{
  			this._user.identity = rsp;
  		});
	}

	checkNightInfo(): Observable<number[]> {
  		let url = "lastNightInfo/";
  		return this.callService.get(url).map(rsp => rsp as number[]);
  	}

  	startGame(): Observable<boolean> {
  		let url = "startGame/";
  		return this.callService.get(url).map(rsp => rsp as boolean);
  	}
}