import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { StatusService } from '../../services';

@Component({
  	selector: 'app-seat',
  	templateUrl: './seat.component.html',
  	styleUrls: ['./seat.component.css']
})
export class SeatComponent {

	seats: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => {return {id: num}});

	constructor(private statusService: StatusService) {

	}

	onSetId(id: number) {
		this.statusService._user.userId = id;
	}
}