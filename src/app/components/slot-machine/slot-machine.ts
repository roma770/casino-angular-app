import { Component } from '@angular/core';
import { UserService } from '../../services/user'; // Путь к файлу user.ts

@Component({
  selector: 'app-slot-machine',
  standalone: true,
  templateUrl: './slot-machine.html',
  styleUrls: ['./slot-machine.scss']
})
export class SlotMachine {
  symbols: string[] = ['🍒', '🍋', '🔔', '🍉', '⭐', '💎'];
  reels: string[] = ['🍒', '🍒', '🍒'];
  isSpinning: boolean = false;
  message: string = 'Сделай ставку и крути!';
  bet: number = 10;

  // Подключаем сервис в конструкторе
  constructor(public userService: UserService) {}

  spin() {
    // Проверяем баланс через сервис
    if (this.userService.balance() < this.bet) {
      this.message = 'Недостаточно средств!';
      return;
    }

    this.isSpinning = true;
    this.userService.updateBalance(-this.bet); // Снимаем ставку с общего баланса
    this.message = 'Крутим...';

    setTimeout(() => {
      this.reels = [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
      this.checkWin();
      this.isSpinning = false;
    }, 1500);
  }

  getRandomSymbol(): string {
    const randomIndex = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[randomIndex];
  }

  checkWin() {
    if (this.reels[0] === this.reels[1] && this.reels[1] === this.reels[2]) {
      const winAmount = this.bet * 10;
      this.userService.updateBalance(winAmount); // Начисляем выигрыш на общий баланс
      this.message = `ДЖЕКПОТ! Вы выиграли ${winAmount} ₽!`;
    } else {
      this.message = 'Мимо. Попробуй еще раз!';
    }
  }
}