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
	
	private settings: Settings = {
  		numPlayers: 0,
  		numWolves: 0,
  		hasHunter: false,
  		hasDumbass: false
  	};

	constructor(private router: Router, private callService: CallService) {

	}

	onCreateGame() {
		let mockData: Settings = {
  			numPlayers: 6,
  			numWolves: 2,
  			hasHunter: false,
  			hasDumbass: false
  		}
  		let url = "createGame/" + this.callService.generateQuery(mockData);
  		this.callService.get(url).map(rsp => rsp.json() as Settings).subscribe(settings => 
  			this.router.navigate(['game']));
	}
}