import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CallService } from '../../services';
import { Settings } from '../../models';

@Component({
  	selector: 'app-settings',
  	templateUrl: './settings.component.html',
  	styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
	
	settings: Settings = {
  		numPlayers: 0,
  		numWolves: 0,
  		hasHunter: false,
  		hasDumbass: false
  	};
  yesOrNo: any[] = ["没有", "有"];

	constructor(private router: Router, private callService: CallService) {

	}

  setHunter(flag: string) {

    if(flag === "有") {
      this.settings.hasHunter = true;
    } else {
      this.settings.hasHunter = false;
    }
  }

  setDumbass(flag: string) {
    if(flag === "有") {
      this.settings.hasDumbass = true;
    } else {
      this.settings.hasDumbass = false;
    }
  }

	onCreateGame() {
  		let url = "createGame/" + this.callService.generateQuery(this.settings);
  		this.callService.get(url).map(rsp => rsp.json() as Settings).subscribe(settings => 
  	  this.router.navigate(['game']));
	}
}