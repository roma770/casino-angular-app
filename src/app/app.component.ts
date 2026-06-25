import { Component, OnInit, signal, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('starsCanvas') starsCanvas!: ElementRef<HTMLCanvasElement>;

  userService = inject(UserService);
  toastService = inject(ToastService);

  isCashierOpen = signal(false);
  depositAmount = 500;

  readonly navMain = [
    { label: 'Головна',    icon: '🏠', route: '/lobby'     },
    { label: 'Провайдери', icon: '👑', route: '/providers' },
    { label: 'Слоти',      icon: '🎰', route: '/slots',    badge: 'HOT' },
    { label: 'Live Казино',icon: '🃏', route: '/live'      },
  ];
  readonly navPromo = [
    { label: 'Бонуси',   icon: '🎁', route: '/bonuses'     },
    { label: 'Турніри',  icon: '🏆', route: '/tournaments' },
    { label: 'Акції',    icon: '🔥', route: '/promotions'  },
  ];
  readonly navOther = [
    { label: 'FAQ',          icon: 'ℹ️',  route: '/faq'   },
    { label: 'Швидкі ігри',  icon: '⚡', route: '/quick'  },
    { label: 'Чат',          icon: '💬', route: '/chat'   },
  ];

  readonly depositOptions = [100, 500, 1000, 5000];

  ngAfterViewInit(): void { this.initStars(); }

  private initStars(): void {
    const canvas = this.starsCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    type Star = { x: number; y: number; r: number; a: number; da: number };
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.01,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.a = Math.max(0.1, Math.min(1, s.a + s.da));
        if (Math.random() < 0.001) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
  }

  openCashier(): void { this.isCashierOpen.set(true); }
  closeCashier(): void { this.isCashierOpen.set(false); }

  selectDeposit(amount: number): void { this.depositAmount = amount; }

  makeDeposit(): void {
    if (this.depositAmount <= 0) return;
    this.userService.updateBalance(this.depositAmount);
    this.closeCashier();
    this.toastService.show(`✅ Рахунок поповнено на ${this.depositAmount} ₴!`, 'success');
  }
}
