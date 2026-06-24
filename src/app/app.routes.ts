import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'lobby', pathMatch: 'full' },
  {
    path: 'lobby',
    loadComponent: () => import('./components/lobby/lobby.component').then(m => m.LobbyComponent)
  },
  {
    path: 'providers',
    loadComponent: () => import('./components/providers/providers.component').then(m => m.ProvidersComponent)
  },
  {
    path: 'slots',
    loadComponent: () => import('./components/slots/slots.component').then(m => m.SlotsComponent)
  },
  {
    path: 'live',
    loadComponent: () => import('./components/live/live.component').then(m => m.LiveComponent)
  },
  {
    path: 'bonuses',
    loadComponent: () => import('./components/bonuses/bonuses.component').then(m => m.BonusesComponent)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./components/tournaments/tournaments.component').then(m => m.TournamentsComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./components/faq/faq.component').then(m => m.FaqComponent)
  },
  { path: '**', redirectTo: 'lobby' }
];
