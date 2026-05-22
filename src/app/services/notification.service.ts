import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messageSubject = new BehaviorSubject<{type: 'error' | 'success', text: string} | null>(null);
  message$ = this.messageSubject.asObservable();

  showError(text: string) {
    this.messageSubject.next({ type: 'error', text });
    setTimeout(() => this.messageSubject.next(null), 5000);
  }

  showSuccess(text: string) {
    this.messageSubject.next({ type: 'success', text });
    setTimeout(() => this.messageSubject.next(null), 5000);
  }
}