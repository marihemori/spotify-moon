import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArtist } from 'src/app/Interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-five-artists',
  templateUrl: './five-artists.component.html',
  styleUrls: ['./five-artists.component.scss'],
})
export class FiveArtistsComponent implements OnInit {
  artists: IArtist[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
    console.log(this.artists);
  }
}
