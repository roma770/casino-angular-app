import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GamesService, Game } from '../../services/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-quick',
  standalone: true,
  imports: [CommonModule, GameModalComponent, DecimalPipe],
  template: `
<div class="quick-page">
  <div class="sec-title">⚡ ШВИДКІ ІГРИ</div>
  <p class="sec-sub">Instant-win ігри без очікування — результат одразу!</p>

  <div class="quick-grid">
    @for (game of games; track game.id) {
      <div class="quick-card" (click)="openGame(game)" [style.background]="game.bg">
        <div class="card-inner">
          @if (game.badge) {
            <span class="badge" [class]="'badge-' + game.badge.toLowerCase()">{{ game.badge }}</span>
          }
          <div class="game-emoji">{{ game.emoji }}</div>
          <div class="game-name">{{ game.name }}</div>
          <div class="game-desc">{{ game.description }}</div>
          <div class="game-meta">
            <span>RTP {{ game.rtp }}%</span>
            <span>від {{ game.minBet }} ₴</span>
          </div>
          <button class="play-btn">▶ Грати зараз</button>
        </div>
      </div>
    }
  </div>
</div>
<app-game-modal #gameModal></app-game-modal>
  `,
  styles: [`
    .quick-page { max-width: 1000px; }
    .sec-title { font-family:'Orbitron',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:1px; margin-bottom:6px; }
    .sec-sub { color:var(--muted); font-size:.85rem; margin-bottom:28px; }
    .quick-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
    .quick-card {
      border-radius:20px; cursor:pointer; transition:.2s; overflow:hidden;
      border:1px solid rgba(255,255,255,.1);
      &:hover { transform:translateY(-6px); box-shadow:0 12px 40px rgba(0,0,0,.4); border-color:rgba(255,255,255,.3); }
    }
    .card-inner { padding:28px 20px; display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; position:relative; }
    .badge {
      position:absolute; top:12px; right:12px;
      font-size:.65rem; font-weight:800; padding:3px 10px; border-radius:10px; color:#fff; letter-spacing:.5px;
      &.badge-hot { background:var(--red); }
      &.badge-top { background:var(--gold); color:#000; }
      &.badge-new { background:var(--green); }
    }
    .game-emoji { font-size:3.5rem; }
    .game-name { font-family:'Orbitron',sans-serif; font-size:1rem; font-weight:700; color:#fff; }
    .game-desc { font-size:.78rem; color:rgba(255,255,255,.65); line-height:1.5; }
    .game-meta { display:flex; gap:12px; font-size:.72rem; color:rgba(255,255,255,.5); }
    .play-btn {
      background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3);
      color:#fff; padding:9px 24px; border-radius:12px;
      font-weight:700; cursor:pointer; transition:.2s; margin-top:4px; width:100%;
      &:hover { background:rgba(255,255,255,.25); }
    }
  `]
})
export class QuickComponent {
  @ViewChild('gameModal') gameModal!: GameModalComponent;
  private gamesService = inject(GamesService);
  games = this.gamesService.getByCategory('quick');
  openGame(game: Game): void { this.gameModal.open(game); }
}
