import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'game', component: GameComponent, title: 'Othello ' },
  { path: 'auth', component: AuthComponent, title: 'Auth' },
  { path: '', component: HomeComponent, title: 'Welcome to Othello/Reversi' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
