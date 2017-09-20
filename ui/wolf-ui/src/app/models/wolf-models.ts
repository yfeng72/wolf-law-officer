export interface User {
	userId: number;
	identity: string;
	isLawOfficer: boolean;
	checkedIdentity: boolean;
}

export interface Skill {
	userId: number;
	killed: number;
	poisoned: number;
	saved: boolean;
	checked: number;
}

export interface Settings {
	numPlayers: number;
	numWolves: number;
	hasHunter: boolean;
	hasDumbass: boolean;
}