import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from './services/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  isCashierOpen = false;
  depositAmount = 500;

  constructor(public userService: UserService) {}

  openCashier() {
    this.isCashierOpen = true;
  }

  closeCashier() {
    this.isCashierOpen = false;
  }

  makeDeposit() {
    if (this.depositAmount > 0) {
      this.userService.updateBalance(this.depositAmount);
      this.closeCashier();
      alert(`Успішно! Рахунок поповнено на ${this.depositAmount} ₴ 🚀`);
    }
  }
}