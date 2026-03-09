import { Routes } from '@angular/router';
import { GameLobby } from './components/game-lobby/game-lobby';
import { SlotMachine } from './components/slot-machine/slot-machine';

export const routes: Routes = [
  { path: '', redirectTo: '/lobby', pathMatch: 'full' },
  { path: 'lobby', component: GameLobby },
  { path: 'play/slots', component: SlotMachine },
  { path: '**', redirectTo: '/lobby' }
];