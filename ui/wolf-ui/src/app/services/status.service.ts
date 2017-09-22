import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models';
import { CallService } from './call.service';

@Injectable()
export class StatusService {

	_user: User = {
        userId: -1,
        identity: null,
        isLawOfficer: false,
        checkedIdentity: false
      };

	constructor(private callService: CallService) {

	}

	getId(id: number) {
		this._user.userId = id;
	}

	becomeJudge() {
		this._user.isLawOfficer = true;
  		let url = "becomeLawOfficer/" + this._user.userId;
  		return this.callService.get(url).map(rsp => {});
	}

	checkIdentity(): Observable<string> {
		let url = "getIdentity/" + this._user.userId;
  		return this.callService.get(url).map(rsp => rsp._body as string);
	}

	checkNightInfo(): Observable<number[]> {
  		let url = "lastNightInfo/";
  		return this.callService.get(url).map(rsp => rsp._body as number[]);
  }

  	startGame(): Observable<boolean> {
  		let url = "startGame/";
  		return this.callService.get(url).map(rsp => rsp._body as boolean);
  	}

  	useSkill(targetId: number) {
  		let url = "useSkill/?userId=" + this._user.userId + "&targetId=" + targetId;
  		return this.callService.get(url).map(rsp => rsp._body as number);
  	}

  	reStart(): Observable<void> {
  		let url = "reshuffle/";
  		return this.callService.get(url).map(rsp => {});
  	}

    getTrack(): Observable<string> {
      let url = "getTrack/";
      return this.callService.get(url).map(rsp => rsp._body as string);
    }
}