import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';
import { RouterModule } from '@angular/router';
import { LeftNavComponent } from 'src/app/components/left-nav/left-nav.component';
import { ButtonMenuComponent } from 'src/app/components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { NavFooterComponent } from 'src/app/components/nav-footer/nav-footer.component';
import { HomeComponent } from '../home/home.component';
import { RightNavComponent } from 'src/app/components/right-nav/right-nav.component';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { FiveArtistsComponent } from 'src/app/components/five-artists/five-artists.component';
import { ArtistItemImageComponent } from 'src/app/components/artist-item-image/artist-item-image.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { MusicListComponent } from '../music-list/music-list.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    MusicListComponent,
    LeftNavComponent,
    ButtonMenuComponent,
    UserAvatarComponent,
    NavFooterComponent,
    HomeComponent,
    TopArtistsComponent,
    RightNavComponent,
    RecentSearchesComponent,
    FiveArtistsComponent,
    ArtistItemImageComponent,
    PlayerCardComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes),
  ],
})
export class PlayerModule {}
