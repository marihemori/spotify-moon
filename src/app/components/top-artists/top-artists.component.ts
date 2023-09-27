import { Component, OnInit } from '@angular/core';
import { IArtist } from 'src/app/Interfaces/IArtist';
import { newArtist } from 'src/app/common/factories';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  topArtist: IArtist = newArtist();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.searchArtist();
  }

  async searchArtist() {
    const artist = await this.spotifyService.getTopArtists(1);
    if (!!artist) this.topArtist = artist.pop();
  }
}
