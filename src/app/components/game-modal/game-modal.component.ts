import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game, GamesService } from '../../services/games.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
@if (game()) {
  <div class="modal-overlay" (click)="close()">
    <div class="game-modal" (click)="$event.stopPropagation()">
      <button class="close-btn" (click)="close()">×</button>

      <div class="game-header" [style.background]="game()!.bg">
        <div class="game-emoji">{{ game()!.emoji }}</div>
        @if (game()!.badge) {
          <span class="game-badge badge-{{ game()!.badge!.toLowerCase() }}">{{ game()!.badge }}</span>
        }
      </div>

      <div class="game-body">
        <h2>{{ game()!.name }}</h2>
        <p class="game-desc">{{ game()!.description }}</p>

        <div class="game-stats">
          <div class="stat">
            <div class="stat-label">RTP</div>
            <div class="stat-val">{{ game()!.rtp }}%</div>
          </div>
          <div class="stat">
            <div class="stat-label">Мін. ставка</div>
            <div class="stat-val">{{ game()!.minBet }} ₴</div>
          </div>
          <div class="stat">
            <div class="stat-label">Макс. ставка</div>
            <div class="stat-val">{{ game()!.maxBet | number }} ₴</div>
          </div>
          <div class="stat">
            <div class="stat-label">Провайдер</div>
            <div class="stat-val">{{ providerName() }}</div>
          </div>
        </div>

        <div class="demo-area" [style.background]="game()!.bg">
          <div class="demo-content">
            <div class="demo-emoji">{{ game()!.emoji }}</div>
            <div class="demo-label">DEMO MODE</div>
            <div class="demo-balance">Баланс: {{ demoBalance() }} ₴</div>
          </div>
        </div>

        <div class="game-actions">
          <button class="btn-play-real" (click)="playReal()">
            🎮 Грати на реальні
          </button>
          <button class="btn-play-demo" (click)="playDemo()">
            🎯 Демо режим
          </button>
        </div>
      </div>
    </div>
  </div>
}
  `,
  styles: [`
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.85);
      display: flex; align-items: center; justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(6px);
    }
    .game-modal {
      background: #1a1330;
      border: 1px solid rgba(192,38,211,.3);
      border-radius: 24px;
      width: 480px;
      max-width: 95vw;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 0 60px rgba(192,38,211,.25);
    }
    .close-btn {
      position: absolute; top: 12px; right: 16px;
      background: none; border: none; color: rgba(255,255,255,.5);
      font-size: 1.6rem; cursor: pointer; z-index: 10;
      transition: .15s;
      &:hover { color: #fff; }
    }
    .game-header {
      height: 160px;
      display: flex; align-items: center; justify-content: center;
      position: relative; border-radius: 24px 24px 0 0;
    }
    .game-emoji { font-size: 5rem; }
    .game-badge {
      position: absolute; top: 12px; left: 12px;
      padding: 4px 10px; border-radius: 10px;
      font-size: .7rem; font-weight: 800; color: #fff;
      text-transform: uppercase; letter-spacing: .5px;
      &.badge-hot { background: var(--red); }
      &.badge-top { background: var(--gold); color: #000; }
      &.badge-new { background: var(--green); }
    }
    .game-body { padding: 20px 24px 24px; }
    h2 {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;
    }
    .game-desc { color: var(--muted); font-size: .9rem; line-height: 1.6; margin-bottom: 18px; }
    .game-stats {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 10px; margin-bottom: 18px;
    }
    .stat {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 10px 14px;
    }
    .stat-label { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .stat-val { font-weight: 700; font-size: .95rem; color: #fff; }
    .demo-area {
      border-radius: 16px;
      height: 140px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 18px;
      position: relative;
      overflow: hidden;
    }
    .demo-content { text-align: center; }
    .demo-emoji { font-size: 3rem; margin-bottom: 6px; }
    .demo-label {
      font-family: 'Orbitron', sans-serif;
      font-size: .7rem; letter-spacing: 3px;
      color: rgba(255,255,255,.6);
      margin-bottom: 4px;
    }
    .demo-balance { font-weight: 700; font-size: .9rem; color: #fff; }
    .game-actions { display: flex; gap: 10px; }
    .btn-play-real {
      flex: 1;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      border: none; color: #fff; padding: 13px;
      border-radius: 14px; font-weight: 700; font-size: .9rem;
      cursor: pointer; transition: .2s;
      &:hover { box-shadow: 0 4px 20px rgba(192,38,211,.5); transform: translateY(-2px); }
    }
    .btn-play-demo {
      flex: 1;
      background: var(--bg-card);
      border: 1px solid var(--border); color: #fff; padding: 13px;
      border-radius: 14px; font-weight: 700; font-size: .9rem;
      cursor: pointer; transition: .2s;
      &:hover { border-color: var(--accent); background: var(--bg-hover); }
    }
  `]
})
export class GameModalComponent {
  private gamesService = inject(GamesService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  game = signal<Game | null>(null);
  demoBalance = signal(1000);

  providerName(): string {
    if (!this.game()) return '';
    return this.gamesService.getProvider(this.game()!.provider)?.name ?? '';
  }

  open(game: Game): void {
    this.game.set(game);
    this.demoBalance.set(1000);
  }

  close(): void { this.game.set(null); }

  playReal(): void {
    if (this.userService.balance() < this.game()!.minBet) {
      this.toastService.show(`❌ Мінімальна ставка ${this.game()!.minBet} ₴`, 'error');
      return;
    }
    const win = Math.random() > 0.5;
    const amount = Math.floor(Math.random() * this.game()!.minBet * 5) + this.game()!.minBet;
    if (win) {
      this.userService.updateBalance(amount);
      this.toastService.show(`🏆 Виграш ${amount} ₴!`, 'win');
    } else {
      this.userService.updateBalance(-this.game()!.minBet);
      this.toastService.show(`💸 Програш ${this.game()!.minBet} ₴`, 'error');
    }
  }

  playDemo(): void {
    const win = Math.random() > 0.5;
    const amount = Math.floor(Math.random() * 200) + 50;
    if (win) {
      this.demoBalance.update(b => b + amount);
      this.toastService.show(`🎯 Демо виграш ${amount} ₴!`, 'success');
    } else {
      this.demoBalance.update(b => Math.max(0, b - 100));
      this.toastService.show(`🎯 Демо програш 100 ₴`, 'success');
    }
  }
}
