import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService, Game, Provider } from '../../services/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, GameModalComponent],
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {
  @ViewChild('gameModal') gameModal!: GameModalComponent;
  private gamesService = inject(GamesService);

  providers = this.gamesService.providers;
  selectedProvider = signal<Provider | null>(null);
  providerGames = signal<Game[]>([]);

  selectProvider(p: Provider): void {
    this.selectedProvider.set(p);
    this.providerGames.set(this.gamesService.getByProvider(p.id));
  }

  clearProvider(): void {
    this.selectedProvider.set(null);
    this.providerGames.set([]);
  }

  openGame(game: Game): void { this.gameModal.open(game); }

  badgeClass(badge?: string): string {
    return badge ? `badge-${badge.toLowerCase()}` : '';
  }

  gameCount(id: string): number {
    return this.gamesService.getByProvider(id).length;
  }
}
