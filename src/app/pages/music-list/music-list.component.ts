import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/Interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit, OnDestroy {
  [x: string]: any;
  bannerImageUrl = '';
  bannerText = '';

  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();
  playIcon = faPlay;

  title = '';

  subs: Subscription[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  getMusics() {
    const sub = this.activedRoute.paramMap.subscribe(async (params) => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getDataPage(type, id);
    });

    this.subs.push(sub);
  }

  async getDataPage(type: string, id: string) {
    if (type == 'playlist') await this.getDataPlaylist(id);
    else await this.getDataArtist(id);
  }

  async getDataPlaylist(playlistId: string) {
    const musicsPlaylist = await this.spotifyService.getPlaylistMusics(
      playlistId
    );
    this.defineDataPage(
      musicsPlaylist.name,
      musicsPlaylist.imageUrl,
      musicsPlaylist.musics
    );
    this.title = 'Playlist musics: ' + musicsPlaylist.name;
  }

  async getDataArtist(artistId: string) {}

  defineDataPage(bannerText: string, bannerImage: string, musics: IMusic[]) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musics = musics;
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }
}
