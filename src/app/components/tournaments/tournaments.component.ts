import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent {
  tournaments = [
    { icon: '🌌', name: 'Cosmo Grand Prix',  dates: '1 — 30 Червня 2026',     progress: 78,  prize: '₴500,000',   players: '2,841', gold: false },
    { icon: '⚡', name: 'Lightning Weekly',   dates: 'Кожен тиждень',           progress: 45,  prize: '₴50,000',    players: '934',   gold: false },
    { icon: '🎰', name: 'Slot Mania',         dates: '24 — 28 Червня 2026',    progress: 22,  prize: '₴25,000',    players: '411',   gold: false },
    { icon: '🏅', name: 'VIP Exclusive',      dates: 'Лише для VIP',            progress: 60,  prize: '₴1,000,000', players: '88',    gold: true  },
  ];
}
