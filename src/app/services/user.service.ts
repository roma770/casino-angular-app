import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  balance = signal<number>(1000);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('cosmoBalance');
      if (saved) this.balance.set(Number(saved));
    }
  }

  updateBalance(amount: number): void {
    this.balance.update(current => {
      const next = Math.max(0, current + amount);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cosmoBalance', String(next));
      }
      return next;
    });
  }
}
