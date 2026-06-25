import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { GamesService, Game } from '../../services/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

interface Symbol { emoji: string; multiplier: number; }

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, GameModalComponent],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent {
  @ViewChild('gameModal') gameModal!: GameModalComponent;
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private gamesService = inject(GamesService);

  balance = this.userService.balance;

  readonly SYMBOLS: Symbol[] = [
    { emoji: '🍒', multiplier: 3  },
    { emoji: '🍋', multiplier: 5  },
    { emoji: '🍉', multiplier: 8  },
    { emoji: '🔔', multiplier: 10 },
    { emoji: '⭐', multiplier: 20 },
    { emoji: '💎', multiplier: 50 },
  ];

  readonly paytable = [...this.SYMBOLS].reverse();

  // All slot games from service
  allSlots = this.gamesService.getByCategory('slots');
  activeTab = signal<'machine' | 'all'>('machine');

  reels = signal<string[]>(['🍒', '🍒', '🍒']);
  isSpinning = signal(false);
  isWin = signal(false);
  message = signal('Зроби ставку та крути!');
  bet = signal(10);
  maxWin = signal(0);

  setTab(tab: 'machine' | 'all'): void { this.activeTab.set(tab); }

  changeBet(delta: number): void {
    if (this.isSpinning()) return;
    this.bet.update(b => Math.max(5, Math.min(500, b + delta)));
  }

  spin(): void {
    if (this.isSpinning()) return;
    if (this.balance() < this.bet()) {
      this.toastService.show('❌ Недостатньо коштів!', 'error');
      return;
    }
    this.isSpinning.set(true);
    this.isWin.set(false);
    this.userService.updateBalance(-this.bet());
    this.message.set('Крутимо...');

    let ticks = 0;
    const interval = setInterval(() => {
      this.reels.set(this.randomReels());
      if (++ticks > 12) clearInterval(interval);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      const result = this.randomReels();
      this.reels.set(result);
      this.resolve(result);
      this.isSpinning.set(false);
    }, 1500);
  }

  private randomReels(): string[] {
    return Array.from({ length: 3 }, () =>
      this.SYMBOLS[Math.floor(Math.random() * this.SYMBOLS.length)].emoji
    );
  }

  private resolve(result: string[]): void {
    if (result[0] === result[1] && result[1] === result[2]) {
      const sym = this.SYMBOLS.find(s => s.emoji === result[0])!;
      const won = this.bet() * sym.multiplier;
      this.userService.updateBalance(won);
      if (won > this.maxWin()) this.maxWin.set(won);
      this.isWin.set(true);
      this.message.set(`🎉 ДЖЕКПОТ! +${won} ₴ (×${sym.multiplier})`);
      this.toastService.show(`🏆 Виграш ${won} ₴!`, 'win');
    } else {
      this.message.set('Мимо! Спробуй ще раз 🎰');
    }
  }

  openGame(game: Game): void { this.gameModal.open(game); }

  badgeClass(badge?: string): string {
    return badge ? `badge-${badge.toLowerCase()}` : '';
  }
}
