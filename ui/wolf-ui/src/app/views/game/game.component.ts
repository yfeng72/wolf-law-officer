import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StatusService } from '../../services';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
   
  private nightInfo: number[];
  private isStart: boolean = false;
  private target: number;
  private day: HTMLAudioElement = new Audio();
  private prophet: HTMLAudioElement = new Audio();
  private witch: HTMLAudioElement = new Audio();
  private wolf: HTMLAudioElement = new Audio();

   constructor(private statusService: StatusService) {

   }

   ngOnInit() {
     this.day.src = "/assets/audio/day.mp3";
     this.prophet.src = "/assets/audio/prophet.mp3";
     this.witch.src = "/assets/audio/witch.mp3";
     this.wolf.src = "/assets/audio/wolf.mp3";
     this.day.load();
     this.prophet.load();
     this.witch.load();
     this.wolf.load();
   }

   onStartGame() {
     setInterval(this.onGetTrack, 1000);
     return this.statusService.startGame().subscribe(rsp =>{
       if (rsp === true) {
         this.isStart = true;
         console.log("Game starts!");
       }
     })
   }

  onUseSkill() {
    this.statusService.useSkill(this.target).subscribe(rsp =>{
      alert(rsp);
    });

  }

  onCheckNightInfo() {
    return this.statusService.checkNightInfo().subscribe(rsp =>{
      this.nightInfo = rsp;
    });
  }

  onGetTrack() {
    this.statusService.getTrack().subscribe(rsp =>{
      if (rsp === "day") {
        this.witch.pause();
        this.wolf.pause();
        this.prophet.pause();
        this.day.play();
      } else if (rsp === "wolf") {
        this.witch.pause();
        this.prophet.pause();
        this.day.pause();
        this.wolf.play();
      } else if (rsp === "witch") {
        this.prophet.pause();
        this.day.pause();
        this.wolf.pause();
        this.witch.play();
      } else if (rsp === "prophet") {
        this.day.pause();
        this.wolf.pause();
        this.witch.pause();
        this.prophet.play();
      }
    });
  }
}