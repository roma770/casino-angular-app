import { Injectable } from '@angular/core';

export interface Game {
  id: string;
  name: string;
  provider: string;
  category: 'slots' | 'live' | 'quick';
  tags: string[];
  badge?: 'HOT' | 'TOP' | 'NEW';
  bg: string;
  emoji: string;
  rtp: number;
  minBet: number;
  maxBet: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class GamesService {

  readonly providers: Provider[] = [
    { id: 'pragmatic',   name: 'Pragmatic Play', logo: '🎯', color: '#e74c3c' },
    { id: 'evolution',   name: 'Evolution',       logo: '⚡', color: '#8e44ad' },
    { id: 'netent',      name: 'NetEnt',          logo: '🎲', color: '#2980b9' },
    { id: 'playtech',    name: 'Playtech',        logo: '🌟', color: '#16a085' },
    { id: 'microgaming', name: 'Microgaming',     logo: '🃏', color: '#d35400' },
    { id: 'yggdrasil',   name: 'Yggdrasil',       logo: '🔮', color: '#6c3483' },
    { id: 'playngo',     name: "Play'n GO",       logo: '🎪', color: '#c0392b' },
    { id: 'redtiger',    name: 'Red Tiger',       logo: '🏆', color: '#922b21' },
    { id: 'hacksaw',     name: 'Hacksaw',         logo: '🚀', color: '#1a5276' },
    { id: 'push',        name: 'Push Gaming',     logo: '💫', color: '#6e2f8a' },
    { id: 'relax',       name: 'Relax Gaming',    logo: '🎰', color: '#117a65' },
    { id: 'thunderkick', name: 'Thunderkick',     logo: '🌊', color: '#1f618d' },
  ];

  readonly games: Game[] = [
    // ── SLOTS ────────────────────────────────────────────────
    {
      id: 'lucky-slot',
      name: 'Удачливий Слот',
      provider: 'pragmatic',
      category: 'slots',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(45deg,#ff9a9e,#fecfef)',
      emoji: '🍒',
      rtp: 96.5,
      minBet: 5,
      maxBet: 5000,
      description: 'Класичний слот з символами фруктів. Три однакові — джекпот!',
    },
    {
      id: 'gates-olympus',
      name: 'Gates of Olympus',
      provider: 'pragmatic',
      category: 'slots',
      tags: ['top', 'bonus-buy'],
      badge: 'TOP',
      bg: 'linear-gradient(120deg,#f6d365,#fda085)',
      emoji: '⚡',
      rtp: 96.5,
      minBet: 20,
      maxBet: 100000,
      description: 'Зевс чекає! Multiplier до ×500 та безкоштовні оберти.',
    },
    {
      id: 'sweet-bonanza',
      name: 'Sweet Bonanza',
      provider: 'pragmatic',
      category: 'slots',
      tags: ['new', 'bonus-buy'],
      badge: 'NEW',
      bg: 'linear-gradient(120deg,#d4fc79,#96e6a1)',
      emoji: '🍭',
      rtp: 96.51,
      minBet: 20,
      maxBet: 125000,
      description: 'Солодкий світ з Tumble механікою та multiplier bombs.',
    },
    {
      id: 'sun-egypt',
      name: 'Sun of Egypt',
      provider: 'playngo',
      category: 'slots',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(to right,#fa709a,#fee140)',
      emoji: '🏺',
      rtp: 95.8,
      minBet: 10,
      maxBet: 50000,
      description: 'Єгипетські таємниці та безмежні скарби фараонів.',
    },
    {
      id: 'coin-strike',
      name: 'Coin Strike',
      provider: 'hacksaw',
      category: 'slots',
      tags: ['top'],
      badge: 'TOP',
      bg: 'linear-gradient(to top,#4facfe,#00f2fe)',
      emoji: '🪙',
      rtp: 96.0,
      minBet: 10,
      maxBet: 100000,
      description: 'Hold & Win механіка з прогресивними джекпотами.',
    },
    {
      id: 'hell-hot',
      name: 'Hell Hot 100',
      provider: 'pragmatic',
      category: 'slots',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(to right,#f83600,#f9d423)',
      emoji: '🔥',
      rtp: 96.12,
      minBet: 10,
      maxBet: 250000,
      description: 'Гаряче поле з 100 лініями виплат і дикими символами.',
    },
    {
      id: 'royal-coins',
      name: 'Royal Coins',
      provider: 'hacksaw',
      category: 'slots',
      tags: ['new'],
      badge: 'NEW',
      bg: 'linear-gradient(135deg,#667eea,#764ba2)',
      emoji: '👑',
      rtp: 96.5,
      minBet: 10,
      maxBet: 50000,
      description: 'Королівський слот з Hold & Win та безкоштовними спінами.',
    },
    {
      id: 'burning-wins',
      name: 'Burning Wins',
      provider: 'playtech',
      category: 'slots',
      tags: ['top'],
      badge: 'TOP',
      bg: 'linear-gradient(to right,#ff0844,#ffb199)',
      emoji: '💥',
      rtp: 95.9,
      minBet: 5,
      maxBet: 10000,
      description: 'Класичний фруктовий слот з вогняними Wild символами.',
    },
    {
      id: 'supreme-hot',
      name: 'Supreme Hot',
      provider: 'playngo',
      category: 'slots',
      tags: ['recommended'],
      bg: 'linear-gradient(to right,#f78ca0,#fe9a8b)',
      emoji: '⭐',
      rtp: 95.72,
      minBet: 5,
      maxBet: 25000,
      description: 'Ретро-слот з 5 барабанами та класичними символами.',
    },
    {
      id: 'joker-troupe',
      name: 'Joker Troupe',
      provider: 'redtiger',
      category: 'slots',
      tags: ['recommended'],
      bg: 'linear-gradient(to top,#0fd850,#f9f047)',
      emoji: '🃏',
      rtp: 96.0,
      minBet: 10,
      maxBet: 40000,
      description: 'Джокери, що приносять великі виграші та каскадні символи.',
    },
    {
      id: 'book-ra',
      name: 'Book of Ra',
      provider: 'netent',
      category: 'slots',
      tags: ['top', 'bonus-buy'],
      badge: 'TOP',
      bg: 'linear-gradient(135deg,#c79081,#dfa579)',
      emoji: '📖',
      rtp: 96.0,
      minBet: 10,
      maxBet: 500000,
      description: 'Легендарний пошук книги Ра у таємничих єгипетських гробницях.',
    },
    {
      id: 'big-bass',
      name: 'Big Bass Bonanza',
      provider: 'pragmatic',
      category: 'slots',
      tags: ['new', 'bonus-buy'],
      badge: 'NEW',
      bg: 'linear-gradient(135deg,#43e97b,#38f9d7)',
      emoji: '🐟',
      rtp: 96.71,
      minBet: 10,
      maxBet: 250000,
      description: 'Рибальський слот з Free Spins та грошовими символами.',
    },

    // ── LIVE ─────────────────────────────────────────────────
    {
      id: 'lightning-roulette',
      name: 'Lightning Roulette',
      provider: 'evolution',
      category: 'live',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(135deg,#1a1a2e,#533483)',
      emoji: '🎡',
      rtp: 97.3,
      minBet: 20,
      maxBet: 500000,
      description: 'Рулетка з блискавками! Множники до ×500 на Lucky Numbers.',
    },
    {
      id: 'crazy-time',
      name: 'Crazy Time',
      provider: 'evolution',
      category: 'live',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(135deg,#3a0ca3,#f72585)',
      emoji: '🎪',
      rtp: 96.08,
      minBet: 10,
      maxBet: 1000000,
      description: 'Найпопулярніше колесо фортуни з 4 бонусними іграми.',
    },
    {
      id: 'baccarat-pro',
      name: 'Baccarat Pro',
      provider: 'playtech',
      category: 'live',
      tags: ['recommended'],
      bg: 'linear-gradient(135deg,#023e8a,#0077b6)',
      emoji: '🃏',
      rtp: 98.94,
      minBet: 50,
      maxBet: 250000,
      description: 'Класичний баккарат з живим дилером та side bets.',
    },
    {
      id: 'blackjack-vip',
      name: 'Blackjack VIP',
      provider: 'netent',
      category: 'live',
      tags: ['top'],
      badge: 'TOP',
      bg: 'linear-gradient(135deg,#6a0572,#ab83a1)',
      emoji: '♠️',
      rtp: 99.28,
      minBet: 100,
      maxBet: 1000000,
      description: 'VIP Блекджек з мінімальним казино-ребром та живим столом.',
    },
    {
      id: 'monopoly-live',
      name: 'Monopoly Live',
      provider: 'evolution',
      category: 'live',
      tags: ['new', 'recommended'],
      badge: 'NEW',
      bg: 'linear-gradient(135deg,#004b23,#55a630)',
      emoji: '🎲',
      rtp: 96.23,
      minBet: 10,
      maxBet: 500000,
      description: 'Монополія в реальному часі з 3D бонусним раундом.',
    },
    {
      id: 'dragon-tiger',
      name: 'Dragon Tiger',
      provider: 'pragmatic',
      category: 'live',
      tags: ['recommended'],
      bg: 'linear-gradient(135deg,#7b2d00,#d4522a)',
      emoji: '🐉',
      rtp: 96.27,
      minBet: 10,
      maxBet: 100000,
      description: 'Проста та захоплива гра — Дракон чи Тигр?',
    },

    // ── QUICK GAMES ──────────────────────────────────────────
    {
      id: 'plinko',
      name: 'Plinko',
      provider: 'hacksaw',
      category: 'quick',
      tags: ['top'],
      badge: 'HOT',
      bg: 'linear-gradient(135deg,#f093fb,#f5576c)',
      emoji: '🔴',
      rtp: 97.0,
      minBet: 10,
      maxBet: 100000,
      description: 'Кулька падає вниз через штирі — виграй до ×1000!',
    },
    {
      id: 'mines',
      name: 'Mines',
      provider: 'hacksaw',
      category: 'quick',
      tags: ['top', 'recommended'],
      badge: 'TOP',
      bg: 'linear-gradient(135deg,#4facfe,#00f2fe)',
      emoji: '💣',
      rtp: 97.0,
      minBet: 10,
      maxBet: 500000,
      description: 'Відкривай клітинки і уникай мін. Зупинись вчасно!',
    },
    {
      id: 'aviator',
      name: 'Aviator',
      provider: 'hacksaw',
      category: 'quick',
      tags: ['top', 'recommended'],
      badge: 'HOT',
      bg: 'linear-gradient(135deg,#f83600,#f9d423)',
      emoji: '✈️',
      rtp: 97.0,
      minBet: 10,
      maxBet: 1000000,
      description: 'Літак злітає — забери виграш до того як він полетить!',
    },
    {
      id: 'dice',
      name: 'Dice',
      provider: 'evolution',
      category: 'quick',
      tags: ['recommended'],
      bg: 'linear-gradient(135deg,#667eea,#764ba2)',
      emoji: '🎲',
      rtp: 98.0,
      minBet: 5,
      maxBet: 50000,
      description: 'Постав на число — від 2 до 98. Твій вибір, твій виграш.',
    },
    {
      id: 'crash',
      name: 'Crash',
      provider: 'relax',
      category: 'quick',
      tags: ['new'],
      badge: 'NEW',
      bg: 'linear-gradient(135deg,#11998e,#38ef7d)',
      emoji: '📈',
      rtp: 97.0,
      minBet: 10,
      maxBet: 500000,
      description: 'Графік росте — встигни вийти до краху!',
    },
  ];

  getByCategory(cat: 'slots' | 'live' | 'quick'): Game[] {
    return this.games.filter(g => g.category === cat);
  }

  getByTag(tag: string): Game[] {
    if (tag === 'all') return this.games;
    return this.games.filter(g => g.tags.includes(tag));
  }

  getByProvider(providerId: string): Game[] {
    return this.games.filter(g => g.provider === providerId);
  }

  getById(id: string): Game | undefined {
    return this.games.find(g => g.id === id);
  }

  getProvider(id: string): Provider | undefined {
    return this.providers.find(p => p.id === id);
  }
}
