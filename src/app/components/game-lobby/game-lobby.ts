import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-lobby.html',
  styleUrls: ['./game-lobby.scss']
})
export class GameLobby {
  // Имитация большого списка игр с разными цветами-заглушками и бейджами
  games = [
    { name: 'Удачливый Слот', type: 'HOT', bg: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)', route: '/play/slots', active: true },
    { name: 'Gates of Olympus', type: 'TOP', bg: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)', route: '/lobby', active: false },
    { name: 'Sweet Bonanza', type: 'NEW', bg: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', route: '/lobby', active: false },
    { name: 'Sun of Egypt', type: 'HOT', bg: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)', route: '/lobby', active: false },
    { name: 'Coin Strike', type: 'TOP', bg: 'linear-gradient(to top, #4facfe 0%, #00f2fe 100%)', route: '/lobby', active: false },
    { name: 'Hell Hot 100', type: 'HOT', bg: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)', route: '/lobby', active: false },
    { name: 'Royal Coins', type: 'NEW', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/lobby', active: false },
    { name: 'Burning Wins', type: 'TOP', bg: 'linear-gradient(to right, #ff0844 0%, #ffb199 100%)', route: '/lobby', active: false },
    { name: 'Supreme Hot', type: '', bg: 'linear-gradient(to right, #f78ca0 0%, #fe9a8b 100%)', route: '/lobby', active: false },
    { name: 'Joker Troupe', type: '', bg: 'linear-gradient(to top, #0fd850 0%, #f9f047 100%)', route: '/lobby', active: false }
  ];
}