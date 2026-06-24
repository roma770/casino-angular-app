import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Game {
  name: string;
  type: 'HOT' | 'TOP' | 'NEW' | '';
  bg: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  activeFilter = 'ТОП';

  filters = ['🔥 ТОП', 'Провайдери', 'CosmoHot', 'Рекомендовані', 'Новинки', 'Bonus buy', 'Найпопулярніші'];

  games: Game[] = [
    { name: 'Удачливий Слот', type: 'HOT', bg: 'linear-gradient(45deg,#ff9a9e,#fecfef)',     route: '/slots', active: true  },
    { name: 'Gates of Olympus',type: 'TOP', bg: 'linear-gradient(120deg,#f6d365,#fda085)',    route: '',       active: false },
    { name: 'Sweet Bonanza',   type: 'NEW', bg: 'linear-gradient(120deg,#d4fc79,#96e6a1)',    route: '',       active: false },
    { name: 'Sun of Egypt',    type: 'HOT', bg: 'linear-gradient(to right,#fa709a,#fee140)',  route: '',       active: false },
    { name: 'Coin Strike',     type: 'TOP', bg: 'linear-gradient(to top,#4facfe,#00f2fe)',    route: '',       active: false },
    { name: 'Hell Hot 100',    type: 'HOT', bg: 'linear-gradient(to right,#f83600,#f9d423)', route: '',       active: false },
    { name: 'Royal Coins',     type: 'NEW', bg: 'linear-gradient(135deg,#667eea,#764ba2)',    route: '',       active: false },
    { name: 'Burning Wins',    type: 'TOP', bg: 'linear-gradient(to right,#ff0844,#ffb199)', route: '',       active: false },
    { name: 'Supreme Hot',     type: '',    bg: 'linear-gradient(to right,#f78ca0,#fe9a8b)', route: '',       active: false },
    { name: 'Joker Troupe',    type: '',    bg: 'linear-gradient(to top,#0fd850,#f9f047)',    route: '',       active: false },
  ];

  liveGames = [
    { name: 'Lightning Roulette', provider: 'Evolution',  emoji: '🎡', bg: 'linear-gradient(135deg,#1a1a2e,#533483)', players: '1,240' },
    { name: 'Crazy Time',         provider: 'Evolution',  emoji: '🎪', bg: 'linear-gradient(135deg,#3a0ca3,#f72585)', players: '3,580' },
    { name: 'Baccarat Pro',       provider: 'Playtech',   emoji: '🃏', bg: 'linear-gradient(135deg,#023e8a,#0077b6)', players: '892'   },
    { name: 'Blackjack VIP',      provider: 'NetEnt',     emoji: '♠️', bg: 'linear-gradient(135deg,#6a0572,#ab83a1)', players: '456'   },
  ];

  setFilter(f: string): void { this.activeFilter = f; }

  badgeClass(type: string): string {
    return { HOT: 'badge-hot', TOP: 'badge-top', NEW: 'badge-new' }[type] ?? '';
  }
}
