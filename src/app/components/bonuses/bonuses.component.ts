import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bonuses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  bonuses = [
    {
      icon: '🎊', cls: 'welcome', expiry: '∞ Постійно',
      title: 'Вітальний Пакет', value: '+200%',
      desc: 'До першого депозиту + 100 Free Spins на Gates of Olympus. Мінімальний депозит 100 ₴.',
      action: 'deposit', label: 'ОТРИМАТИ БОНУС'
    },
    {
      icon: '🚀', cls: 'fs', expiry: '⏰ 3 дні',
      title: 'Космічні Free Spins', value: '50 FS',
      desc: 'Виконай Cosmo-челендж та отримай 50 безкоштовних обертань без вейджеру.',
      action: 'play', label: 'ГРАТИ ЗАРАЗ'
    },
    {
      icon: '💸', cls: 'cashback', expiry: '📅 Щотижня',
      title: 'Щотижневий Кешбек', value: '10%',
      desc: 'Повертаємо 10% від програшів щопонеділка. Без обмежень по сумі.',
      action: 'cashback', label: 'АКТИВУВАТИ'
    },
  ];

  claim(bonus: typeof this.bonuses[0]): void {
    if (bonus.action === 'cashback') {
      this.userService.updateBalance(200);
      this.toastService.show('💸 Кешбек 200 ₴ зараховано!', 'success');
    } else {
      this.toastService.show('🎁 Бонус активовано!', 'success');
    }
  }
}
