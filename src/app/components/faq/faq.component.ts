import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem { q: string; a: string; open: boolean; }

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  items = signal<FaqItem[]>([
    { q: 'Як поповнити рахунок?',
      a: 'Натисни кнопку «+» у правому верхньому куті або перейди до розділу «Каса». Ми приймаємо Visa, Mastercard, Apple Pay, Google Pay та криптовалюти. Мінімальна сума — 50 ₴.',
      open: false },
    { q: 'Як вивести кошти?',
      a: 'Виведення коштів доступне через Каса → Вивести. Термін обробки — до 24 годин. Мінімальна сума — 100 ₴. Верифікація може знадобитися при першому виведенні.',
      open: false },
    { q: 'Що таке Free Spins і як ними скористатись?',
      a: 'Free Spins (FS) — безкоштовні оберти у слотах. Вони нараховуються автоматично після виконання умов бонусу. Просто зайди у відповідну гру — спіни будуть активні.',
      open: false },
    { q: 'Як зв\'язатись з підтримкою?',
      a: 'Наша підтримка працює 24/7. Ти можеш написати у Live Chat (кнопка 💬 у меню), надіслати email на support@cosmoroom.ua або звернутися до нас у Telegram @cosmoroom_support.',
      open: false },
    { q: 'Чи ліцензоване казино?',
      a: 'Так, COSMOROOM має ліцензію КРАІЛ (Комісія з регулювання азартних ігор та лотерей) № 123456-АГ. Всі ігри сертифіковані та перевіряються незалежними аудиторами.',
      open: false },
    { q: 'Що таке вейджер і як його виконати?',
      a: 'Вейджер (x30) — це умова, при якій потрібно поставити суму бонусу помножену на 30 перед виведенням. Наприклад, бонус 100 ₴ × 30 = 3000 ₴. Відстежується в особистому кабінеті.',
      open: false },
  ]);

  toggle(index: number): void {
    this.items.update(list =>
      list.map((item, i) => ({ ...item, open: i === index ? !item.open : false }))
    );
  }
}
