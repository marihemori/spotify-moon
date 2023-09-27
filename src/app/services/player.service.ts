import { Injectable } from '@angular/core';
import { IMusic } from '../Interfaces/IMusic';
import { BehaviorSubject } from 'rxjs';
import { newMusic } from '../common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  async getCurrentMusic() {
    clearTimeout(this.timerId);

    // Obtain the music
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    // Cause loop
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 5000);
  }

  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }

  async previousMusic() {
    await this.spotifyService.previousMusic();
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }
}
