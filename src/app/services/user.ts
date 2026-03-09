import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  balance = signal(1000); 

  constructor() {
    // Проверяем, существует ли localStorage (то есть, открыт ли сайт в браузере)
    if (typeof localStorage !== 'undefined') {
      const savedBalance = localStorage.getItem('casinoBalance');
      if (savedBalance) {
        this.balance.set(Number(savedBalance));
      }
    }
  }

  updateBalance(amount: number) {
    this.balance.update(current => {
      const newBalance = current + amount;
      
      // И здесь тоже проверяем перед сохранением
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('casinoBalance', newBalance.toString());
      }
      
      return newBalance;
    });
  }
}