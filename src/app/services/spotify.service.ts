import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../Interfaces/IUser';
import {
  SpotifyArtistForArtist,
  SpotifyMusicForMusic,
  SpotifyPlaylistForPlaylist,
  SpotifySinglePlaylistForPlaylist,
  SpotifyUserForUser,
} from '../common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../Interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusic';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initUser() {
    if (!!this.user) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.defineAccessToken(token);
      await this.obtainSpotifyUser();
      return !!this.user;
    } catch (ex) {
      return false;
    }
  }

  async obtainSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserForUser(userInfo);
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.href.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async searchUserPlaylist(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user?.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistForPlaylist);
  }

  async getPlaylistMusics(playlistId: string, offset: number = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) null;

    const playlist = SpotifySinglePlaylistForPlaylist(playlistSpotify);

    const musicsSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    playlist.musics = musicsSpotify.items.map((music) =>
      SpotifyMusicForMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistForArtist);
  }

  async searchMusics(offset = 0, limit = 40): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map((x) => SpotifyMusicForMusic(x.track));
  }

  async playMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicForMusic(musicSpotify.item);
  }

  async previousMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
