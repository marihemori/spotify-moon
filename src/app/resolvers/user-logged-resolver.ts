import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const userLoggedResolver = () =>
  new Promise(async (res, rej) => {
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);

    const unauthenticated = () => {
      localStorage.clear();
      router.navigateByUrl('/login');
      rej('Unauthenticated user!');
      return false;
    };

    const token = localStorage.getItem('token');

    if (!token) {
      return unauthenticated();
    }

    const userCreated = await spotifyService.initUser();
    if (userCreated) res(true);
    else res(unauthenticated());

    return false;
  });
