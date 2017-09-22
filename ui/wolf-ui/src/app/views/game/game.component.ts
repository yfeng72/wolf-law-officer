import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { StatusService } from '../../services';

@Component({
  	selector: 'app-game',
  	templateUrl: './game.component.html',
  	styleUrls: ['./game.component.css']
})
export class GameComponent {
 	
	private nightInfo: number[];
	private isStart: boolean = false;

 	constructor(private statusService: StatusService) {
 		this.statusService.startGame().subscribe(rsp =>{
 			console.log("Game starts!");
 			this.isStart = true;
 		})
 	}


  onCheckNightInfo() {
  	this.statusService.checkNightInfo().subscribe(rsp =>{
  		this.nightInfo = rsp;
  	});
  }
}