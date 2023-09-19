import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
})
export class NavFooterComponent implements OnInit {
  signIcon = faSignOut;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {}

  logout() {
    this.spotifyService.logout();
  }
}
