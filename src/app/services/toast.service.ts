import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'win' | 'error';
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast>({ message: '', type: 'success', visible: false });
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: Toast['type'] = 'success'): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set({ message, type, visible: true });
    this.timer = setTimeout(() => {
      this.toast.update(t => ({ ...t, visible: false }));
    }, 3000);
  }
}
