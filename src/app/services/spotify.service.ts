import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.development';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../Interfaces/IUser';
import {
  SpotifyPlaylistForPlaylist,
  SpotifyUserForUser,
} from '../Common/spotifyHelpes';
import { IPlaylist } from '../Interfaces/IPlaylist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor() {
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
}
