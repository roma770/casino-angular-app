import { Component, inject, ViewChild, signal } from '@angular/core';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { GamesService, Game } from '../../services/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule, GameModalComponent, DecimalPipe, TitleCasePipe],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent {
  @ViewChild('gameModal') gameModal!: GameModalComponent;
  private gamesService = inject(GamesService);

  games = this.gamesService.getByCategory('live');
  playerCounts = signal<Record<string, number>>({});

  constructor() {
    // Simulate live player counts
    const counts: Record<string, number> = {};
    this.games.forEach(g => {
      counts[g.id] = Math.floor(Math.random() * 3000) + 200;
    });
    this.playerCounts.set(counts);

    // Update every 3s
    setInterval(() => {
      const updated: Record<string, number> = {};
      this.games.forEach(g => {
        const current = this.playerCounts()[g.id] ?? 500;
        updated[g.id] = Math.max(100, current + Math.floor((Math.random() - 0.5) * 40));
      });
      this.playerCounts.set(updated);
    }, 3000);
  }

  openGame(game: Game): void { this.gameModal.open(game); }

  badgeClass(badge?: string): string {
    return badge ? `badge-${badge.toLowerCase()}` : '';
  }
}
