import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { IUser } from 'src/app/Interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
})
export class LeftNavComponent implements OnInit {
  selectedMenuItem = 'Home';

  playlists: IPlaylist[] = [];
  user: IUser = null;

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistsIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.searchPlaylists();
    this.user = this.spotifyService.user;
    console.log(`${this.user} done?`);
  }

  buttonClick(button: string) {
    this.selectedMenuItem = button;
    this.router.navigateByUrl('player/home');
  }

  async searchPlaylists() {
    this.playlists = await this.spotifyService.searchUserPlaylist();
    console.log(this.playlists);
  }
}
