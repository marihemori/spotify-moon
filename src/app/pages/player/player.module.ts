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
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { RightNavComponent } from 'src/app/components/right-nav/right-nav.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftNavComponent,
    ButtonMenuComponent,
    UserAvatarComponent,
    NavFooterComponent,
    HomeComponent,
    TopArtistsComponent,
    RightNavComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes),
  ],
})
export class PlayerModule {}
