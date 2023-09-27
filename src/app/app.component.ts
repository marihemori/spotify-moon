import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularSpotifyMoonMood';

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.getTokenUrlCallback();
  }

  getTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();

    if (!!token) {
      this.spotifyService.defineAccessToken(token);
      this.router.navigate(['/player/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getUrlLogin();
  }
}
