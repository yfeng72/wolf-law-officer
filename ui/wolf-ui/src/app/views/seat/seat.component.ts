import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  	selector: 'app-seat',
  	templateUrl: './seat.component.html',
  	styleUrls: ['./seat.component.css']
})
export class SeatComponent {
	persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(it => <any>{_id: it});
	
	clickHandler() {
		
	}
}