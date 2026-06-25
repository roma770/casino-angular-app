import { Component, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  from: 'user' | 'support';
  time: string;
  name: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="chat-page">
  <div class="chat-header">
    <div class="agent-info">
      <div class="agent-avatar">🎧</div>
      <div>
        <div class="agent-name">Sophia • Підтримка</div>
        <div class="agent-status"><span class="online-dot"></span> Онлайн · відповідає миттєво</div>
      </div>
    </div>
    <div class="chat-actions">
      <button class="action-btn" title="Нова тема" (click)="clearChat()">↺</button>
    </div>
  </div>

  <div class="messages-area" #messagesArea>
    <div class="date-divider">Сьогодні</div>

    @for (msg of messages(); track msg.id) {
      <div class="message" [class.from-user]="msg.from === 'user'" [class.from-support]="msg.from === 'support'">
        @if (msg.from === 'support') {
          <div class="msg-avatar">🎧</div>
        }
        <div class="msg-bubble">
          <div class="msg-name">{{ msg.name }}</div>
          <div class="msg-text">{{ msg.text }}</div>
          <div class="msg-time">{{ msg.time }}</div>
        </div>
      </div>
    }

    @if (isTyping()) {
      <div class="message from-support">
        <div class="msg-avatar">🎧</div>
        <div class="msg-bubble typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    }
  </div>

  <div class="quick-replies">
    @for (q of quickReplies; track q) {
      <button class="quick-btn" (click)="sendQuick(q)">{{ q }}</button>
    }
  </div>

  <div class="input-area">
    <input
      #inputEl
      type="text"
      [(ngModel)]="inputText"
      placeholder="Напишіть повідомлення..."
      (keydown.enter)="send()"
      class="chat-input">
    <button class="send-btn" (click)="send()" [disabled]="!inputText.trim()">
      ➤
    </button>
  </div>
</div>
  `,
  styles: [`
    .chat-page {
      max-width: 700px;
      display: flex; flex-direction: column;
      height: calc(100vh - 160px);
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
    }

    .chat-header {
      padding: 16px 20px;
      background: linear-gradient(135deg, #1a1330, #110d1e);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
    }
    .agent-info { display:flex; align-items:center; gap:12px; }
    .agent-avatar { font-size:2rem; background:rgba(192,38,211,.15); border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border:1px solid var(--accent); }
    .agent-name { font-weight:700; font-size:.95rem; margin-bottom:3px; }
    .agent-status { font-size:.75rem; color:var(--muted); display:flex; align-items:center; gap:5px; }
    .online-dot { width:7px; height:7px; background:var(--green); border-radius:50%; animation:pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    .action-btn { background:none; border:1px solid var(--border); color:var(--muted); width:32px; height:32px; border-radius:8px; cursor:pointer; font-size:1.1rem; transition:.15s; &:hover{color:#fff;border-color:var(--accent);} }

    .messages-area {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-thumb { background: var(--accent2); border-radius: 2px; }
    }

    .date-divider { text-align:center; font-size:.72rem; color:var(--muted); margin:4px 0 8px; }

    .message { display:flex; gap:10px; align-items:flex-end; }
    .from-user { flex-direction:row-reverse; }

    .msg-avatar { font-size:1.4rem; background:rgba(192,38,211,.1); border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid var(--border); }

    .msg-bubble {
      max-width: 75%; padding: 10px 14px;
      border-radius: 16px; position: relative;
      background: var(--bg-hover); border: 1px solid var(--border);
    }
    .from-user .msg-bubble { background:linear-gradient(135deg,rgba(192,38,211,.3),rgba(124,58,237,.2)); border-color:rgba(192,38,211,.3); }

    .msg-name { font-size:.68rem; color:var(--muted); margin-bottom:4px; font-weight:600; }
    .from-user .msg-name { display:none; }
    .msg-text { font-size:.9rem; line-height:1.5; }
    .msg-time { font-size:.65rem; color:var(--muted); margin-top:4px; text-align:right; }

    .typing {
      display: flex; gap: 5px; align-items: center; padding: 12px 16px;
      span {
        width: 7px; height: 7px; background: var(--muted); border-radius: 50%;
        animation: bounce .8s infinite;
        &:nth-child(2) { animation-delay: .15s; }
        &:nth-child(3) { animation-delay: .3s; }
      }
    }
    @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

    .quick-replies {
      padding: 8px 16px;
      display: flex; gap: 8px; flex-wrap: wrap;
      border-top: 1px solid var(--border);
    }
    .quick-btn {
      background: var(--bg-deep); border: 1px solid var(--border);
      color: var(--muted); padding: 5px 12px; border-radius: 20px;
      font-size: .75rem; cursor: pointer; transition: .15s; white-space: nowrap;
      &:hover { border-color: var(--accent); color: #fff; }
    }

    .input-area {
      padding: 12px 16px;
      display: flex; gap: 10px; align-items: center;
      border-top: 1px solid var(--border);
      background: var(--bg-deep);
    }
    .chat-input {
      flex: 1; background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 20px; padding: 10px 16px; color: #fff; font-size: .9rem;
      outline: none; transition: .2s;
      &:focus { border-color: var(--accent); }
      &::placeholder { color: var(--muted); }
    }
    .send-btn {
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      border: none; color: #fff; width: 40px; height: 40px; border-radius: 50%;
      cursor: pointer; font-size: 1rem; transition: .2s; flex-shrink: 0;
      &:hover:not(:disabled) { transform: scale(1.1); }
      &:disabled { opacity: .4; cursor: not-allowed; }
    }
  `]
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('messagesArea') messagesArea!: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  inputText = '';
  isTyping = signal(false);
  private msgId = 0;

  messages = signal<Message[]>([
    {
      id: ++this.msgId,
      from: 'support',
      name: 'Sophia',
      text: '👋 Привіт! Я Sophia, ваш особистий менеджер підтримки COSMOROOM. Чим можу допомогти?',
      time: this.now()
    }
  ]);

  quickReplies = [
    'Як поповнити рахунок?',
    'Як вивести гроші?',
    'Про бонуси',
    'Технічна проблема',
  ];

  private supportReplies: Record<string, string> = {
    'як поповнити': 'Поповнення доступне через кнопку "+" у правому верхньому куті. Приймаємо Visa, Mastercard, Apple Pay та криптовалюти. Мінімум — 50 ₴ 💳',
    'як вивести': 'Виведення через особистий кабінет → Каса → Вивести. Час обробки до 24 годин. Мінімум — 100 ₴. Перше виведення потребує верифікації 📋',
    'бонус': 'У нас є вітальний бонус +200%, щотижневий кешбек 10%, та спеціальні Free Spins акції! Перейди до розділу "Акції" для деталей 🎁',
    'технічна': 'Опишіть проблему детальніше і я одразу допоможу! Також можете надіслати скрін на support@cosmoroom.ua 🔧',
    'default': 'Дякую за питання! Наша команда вивчає його і відповість протягом декількох хвилин. Є ще щось чим можу допомогти? 😊'
  };

  ngAfterViewInit(): void { this.scrollToBottom(); }

  sendQuick(text: string): void {
    this.inputText = text;
    this.send();
  }

  send(): void {
    const text = this.inputText.trim();
    if (!text) return;

    this.messages.update(msgs => [...msgs, {
      id: ++this.msgId, from: 'user', name: 'Ви', text, time: this.now()
    }]);
    this.inputText = '';
    setTimeout(() => this.scrollToBottom());

    // Simulate support typing
    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      const reply = this.getReply(text);
      this.messages.update(msgs => [...msgs, {
        id: ++this.msgId, from: 'support', name: 'Sophia', text: reply, time: this.now()
      }]);
      setTimeout(() => this.scrollToBottom());
    }, 1200 + Math.random() * 800);
  }

  clearChat(): void {
    this.messages.set([{
      id: ++this.msgId, from: 'support', name: 'Sophia',
      text: '👋 Нова розмова розпочата! Чим можу допомогти?',
      time: this.now()
    }]);
  }

  private getReply(text: string): string {
    const lower = text.toLowerCase();
    for (const [key, reply] of Object.entries(this.supportReplies)) {
      if (key !== 'default' && lower.includes(key)) return reply;
    }
    return this.supportReplies['default'];
  }

  private now(): string {
    return new Date().toLocaleTimeString('uk', { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    const el = this.messagesArea?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
