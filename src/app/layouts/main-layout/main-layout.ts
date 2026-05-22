import { Component, inject } from '@angular/core';

import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    CommonModule
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css',
})
export class MainLayout {
  private notify = inject(NotificationService);
  message$ = this.notify.message$;
}