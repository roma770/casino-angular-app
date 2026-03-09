import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // signal позволяет Angular автоматически обновлять баланс на всех страницах сразу
  balance = signal(1000); 

  // Метод для изменения баланса (плюс или минус)
  updateBalance(amount: number) {
    this.balance.update(current => current + amount);
  }
}