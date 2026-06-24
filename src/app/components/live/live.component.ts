import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="live-page">
  <div class="sec-title">🃏 LIVE КАЗИНО</div>
  <div class="live-grid">
    @for (g of games; track g.name) {
      <div class="live-card">
        <div class="live-thumb" [style.background]="g.bg">
          <span class="emoji">{{ g.emoji }}</span>
          <span class="live-badge"><span class="dot"></span> LIVE</span>
          <span class="players">👥 {{ g.players }}</span>
        </div>
        <div class="live-info">
          <div class="name">{{ g.name }}</div>
          <div class="provider">{{ g.provider }}</div>
        </div>
      </div>
    }
  </div>
</div>
  `,
  styles: [`
    .live-page { max-width: 1200px; }
    .sec-title { font-family:'Orbitron',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:1px; margin-bottom:24px; }
    .live-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
    .live-card {
      background:var(--bg-card); border:1px solid var(--border); border-radius:18px;
      overflow:hidden; cursor:pointer; transition:.2s;
      &:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 8px 28px rgba(192,38,211,.25); }
    }
    .live-thumb {
      height:160px; display:flex; align-items:center; justify-content:center;
      font-size:4rem; position:relative;
    }
    .emoji { font-size:4rem; }
    .live-badge {
      position:absolute; top:10px; left:10px;
      background:var(--red); color:#fff; font-size:.65rem; font-weight:800;
      padding:3px 10px; border-radius:8px; display:flex; align-items:center; gap:5px;
    }
    .dot { width:6px; height:6px; background:#fff; border-radius:50%; animation:blink 1s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
    .players { position:absolute; top:10px; right:10px; font-size:.7rem; color:rgba(255,255,255,.7); background:rgba(0,0,0,.5); padding:3px 8px; border-radius:8px; }
    .live-info { padding:14px 16px; }
    .name { font-weight:700; margin-bottom:4px; }
    .provider { font-size:.75rem; color:var(--muted); }
  `]
})
export class LiveComponent {
  games = [
    { name: 'Lightning Roulette', provider: 'Evolution Gaming', emoji: '🎡', bg: 'linear-gradient(135deg,#1a1a2e,#533483)', players: '1,240' },
    { name: 'Crazy Time',         provider: 'Evolution Gaming', emoji: '🎪', bg: 'linear-gradient(135deg,#3a0ca3,#f72585)', players: '3,580' },
    { name: 'Baccarat Pro',       provider: 'Playtech',         emoji: '🃏', bg: 'linear-gradient(135deg,#023e8a,#0077b6)', players: '892'   },
    { name: 'Blackjack VIP',      provider: 'NetEnt',           emoji: '♠️', bg: 'linear-gradient(135deg,#6a0572,#ab83a1)', players: '456'   },
    { name: 'Monopoly Live',      provider: 'Evolution Gaming', emoji: '🎲', bg: 'linear-gradient(135deg,#004b23,#55a630)', players: '2,100' },
    { name: 'Dragon Tiger',       provider: 'Pragmatic Play',   emoji: '🀄', bg: 'linear-gradient(135deg,#7b2d00,#d4522a)', players: '310'   },
  ];
}
