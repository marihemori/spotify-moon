import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  user: IUser = null;

  constructor(private SpotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.user = this.SpotifyService.user;
  }
}
