import { Routes } from '@angular/router';
import { SeatComponent } from './views/seat';
import { GameComponent } from './views/game';
import { SettingsComponent } from './views/settings';

export const routes: Routes = [
	{
    	path: '',
    	component: SeatComponent
	},
	{
		path: 'game',
		component: GameComponent
	},
	{
		path: 'settings',
		component: SettingsComponent
	}
];