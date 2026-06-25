import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesService, Game } from '../../services/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [RouterLink, CommonModule, GameModalComponent],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  @ViewChild('gameModal') gameModal!: GameModalComponent;
  private gamesService = inject(GamesService);

  activeFilter = signal('all');

  filters = [
    { label: '🔥 ТОП',        tag: 'top'         },
    { label: 'Рекомендовані', tag: 'recommended' },
    { label: 'Новинки',       tag: 'new'         },
    { label: 'Bonus Buy',     tag: 'bonus-buy'   },
    { label: 'Всі ігри',      tag: 'all'         },
  ];

  topGames = computed(() => {
    const tag = this.activeFilter();
    const slots = this.gamesService.getByCategory('slots');
    return tag === 'all' ? slots : slots.filter(g => g.tags.includes(tag));
  });

  liveGames = this.gamesService.getByCategory('live').slice(0, 4);
  quickGames = this.gamesService.getByCategory('quick').slice(0, 3);

  setFilter(tag: string): void { this.activeFilter.set(tag); }

  openGame(game: Game): void { this.gameModal.open(game); }

  badgeClass(badge?: string): string {
    return badge ? `badge-${badge.toLowerCase()}` : '';
  }
}
