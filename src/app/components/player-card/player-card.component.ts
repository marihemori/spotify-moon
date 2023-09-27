import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  music: IMusic = newMusic();
  subs: Subscription[] = [];

  //Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayingMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getPlayingMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  previousMusic() {
    this.playerService.previousMusic();
  }

  nextMusic() {
    this.playerService.nextMusic();
  }
}
