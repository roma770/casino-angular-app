import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

interface Promo {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  desc: string;
  expiry: string;
  color: string;
  tag: string;
  amount: number;
}

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="promo-page">
  <div class="sec-title">🔥 АКЦІЇ ТА ПРОПОЗИЦІЇ</div>
  <p class="sec-sub">Ексклюзивні пропозиції тільки для гравців COSMOROOM</p>

  <div class="promo-filters">
    @for (f of promoFilters; track f) {
      <button class="filter-btn" [class.active]="activeFilter() === f" (click)="activeFilter.set(f)">{{ f }}</button>
    }
  </div>

  <div class="promo-grid">
    @for (promo of filteredPromos(); track promo.id) {
      <div class="promo-card" [style.background]="promo.color" [class.claimed]="claimed().has(promo.id)">
        <div class="promo-expiry">{{ promo.expiry }}</div>
        <div class="promo-tag">{{ promo.tag }}</div>
        <div class="promo-icon">{{ promo.icon }}</div>
        <div class="promo-title">{{ promo.title }}</div>
        <div class="promo-value">{{ promo.value }}</div>
        <p class="promo-desc">{{ promo.desc }}</p>
        <button class="btn-claim"
          [disabled]="claimed().has(promo.id)"
          (click)="claim(promo)">
          {{ claimed().has(promo.id) ? '✅ Активовано' : 'ОТРИМАТИ' }}
        </button>
      </div>
    }
  </div>
</div>
  `,
  styles: [`
    .promo-page { max-width: 1100px; }
    .sec-title { font-family:'Orbitron',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:1px; margin-bottom:6px; }
    .sec-sub { color:var(--muted); font-size:.85rem; margin-bottom:20px; }
    .promo-filters { display:flex; gap:8px; margin-bottom:24px; flex-wrap:wrap; }
    .filter-btn {
      background:var(--bg-card); border:1px solid var(--border); color:var(--muted);
      padding:7px 16px; border-radius:10px; cursor:pointer; font-size:.82rem; font-weight:600;
      transition:.15s;
      &.active, &:hover { background:rgba(192,38,211,.2); border-color:var(--accent); color:#fff; }
    }
    .promo-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:16px; }
    .promo-card {
      border-radius:20px; padding:26px 22px; position:relative;
      border:1px solid rgba(255,255,255,.1); transition:.2s;
      &:hover { transform:translateY(-4px); box-shadow:0 10px 30px rgba(0,0,0,.3); }
      &.claimed { opacity:.6; }
    }
    .promo-expiry {
      position:absolute; top:14px; right:14px;
      font-size:.68rem; color:rgba(255,255,255,.6);
      background:rgba(0,0,0,.3); padding:3px 8px; border-radius:8px;
    }
    .promo-tag {
      font-size:.65rem; font-weight:800; letter-spacing:1px;
      color:rgba(255,255,255,.5); text-transform:uppercase; margin-bottom:12px;
    }
    .promo-icon { font-size:2.8rem; margin-bottom:12px; }
    .promo-title { font-family:'Orbitron',sans-serif; font-size:.95rem; font-weight:700; margin-bottom:8px; }
    .promo-value { font-size:2rem; font-weight:900; color:var(--gold); font-family:'Orbitron',sans-serif; margin-bottom:10px; }
    .promo-desc { color:rgba(255,255,255,.65); font-size:.82rem; line-height:1.6; margin-bottom:18px; }
    .btn-claim {
      width:100%;
      background:linear-gradient(90deg,var(--accent),var(--accent2));
      border:none; color:#fff; padding:11px; border-radius:12px;
      font-weight:700; font-size:.85rem; cursor:pointer; transition:.2s; letter-spacing:.5px;
      &:hover:not(:disabled) { box-shadow:0 4px 16px rgba(192,38,211,.5); transform:scale(1.02); }
      &:disabled { opacity:.7; cursor:default; background:rgba(255,255,255,.15); }
    }
  `]
})
export class PromotionsComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  activeFilter = signal('Всі');
  claimed = signal<Set<string>>(new Set());

  promoFilters = ['Всі', 'Депозит', 'Free Spins', 'Кешбек', 'VIP'];

  promos: Promo[] = [
    {
      id: 'welcome',
      icon: '🎊', title: 'Вітальний Пакет', subtitle: 'Новим гравцям',
      value: '+200%', tag: 'ДЕПОЗИТ',
      desc: 'До першого депозиту + 100 Free Spins на Gates of Olympus. Мін. депозит 100 ₴.',
      expiry: '∞ Постійно',
      color: 'linear-gradient(135deg,#1a0b30,#3b0764)',
      amount: 500
    },
    {
      id: 'fs50',
      icon: '🚀', title: 'Космічні Free Spins', subtitle: 'За активність',
      value: '50 FS', tag: 'FREE SPINS',
      desc: 'Виконай Cosmo-челендж та отримай 50 безкоштовних обертань без вейджеру.',
      expiry: '⏰ 3 дні',
      color: 'linear-gradient(135deg,#0c2340,#1e3a5f)',
      amount: 200
    },
    {
      id: 'cashback',
      icon: '💸', title: 'Щотижневий Кешбек', subtitle: 'Щопонеділка',
      value: '10%', tag: 'КЕШБЕК',
      desc: 'Повертаємо 10% від програшів щопонеділка. Без обмежень по сумі.',
      expiry: '📅 Щотижня',
      color: 'linear-gradient(135deg,#0c2816,#14532d)',
      amount: 300
    },
    {
      id: 'reload',
      icon: '💰', title: 'Reload Бонус', subtitle: 'Щодня',
      value: '+50%', tag: 'ДЕПОЗИТ',
      desc: 'Поповни рахунок щодня та отримай 50% бонус до 5000 ₴.',
      expiry: '📅 Щодня',
      color: 'linear-gradient(135deg,#3d1100,#7c2d00)',
      amount: 400
    },
    {
      id: 'vip',
      icon: '👑', title: 'VIP Програма', subtitle: 'Ексклюзив',
      value: '1000 ₴', tag: 'VIP',
      desc: 'Приєднайся до VIP клубу та отримай персонального менеджера і ексклюзивні бонуси.',
      expiry: '∞ Постійно',
      color: 'linear-gradient(135deg,#3d2b00,#7a5500)',
      amount: 1000
    },
    {
      id: 'fs100',
      icon: '🌀', title: '100 Free Spins', subtitle: 'На Sweet Bonanza',
      value: '100 FS', tag: 'FREE SPINS',
      desc: '100 безкоштовних обертань на Sweet Bonanza при поповненні від 500 ₴.',
      expiry: '⏰ 7 днів',
      color: 'linear-gradient(135deg,#0a2a00,#1a5c00)',
      amount: 250
    },
  ];

  filteredPromos() {
    const f = this.activeFilter();
    if (f === 'Всі') return this.promos;
    const map: Record<string, string> = {
      'Депозит': 'ДЕПОЗИТ', 'Free Spins': 'FREE SPINS',
      'Кешбек': 'КЕШБЕК', 'VIP': 'VIP'
    };
    return this.promos.filter(p => p.tag === map[f]);
  }

  claim(promo: Promo): void {
    if (this.claimed().has(promo.id)) return;
    this.claimed.update(s => new Set([...s, promo.id]));
    this.userService.updateBalance(promo.amount);
    this.toastService.show(`🎁 ${promo.title} активовано! +${promo.amount} ₴`, 'success');
  }
}
