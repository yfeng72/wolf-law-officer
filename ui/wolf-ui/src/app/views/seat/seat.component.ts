import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { StatusService } from '../../services';
import { User } from '../../models';

@Component({
  	selector: 'app-seat',
  	templateUrl: './seat.component.html',
  	styleUrls: ['./seat.component.css']
})
export class SeatComponent {

	seats: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => {return {id: num}});
	private user: User;

	constructor(private statusService: StatusService) {
		this.user = this.statusService._user;
	}

	onSetId(id: number) {
		this.statusService._user.userId = id;
	}
}