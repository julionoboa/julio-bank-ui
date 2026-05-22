import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css',
})
export class AccountList implements OnInit {

  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  accounts: any[] = [];

  showForm = false;
  accountForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadAccounts();
  }

  initForm(): void {
    this.accountForm = this.fb.group({
      clientId: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['SAVINGS', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]] 
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts()
      .subscribe((response: any[]) => {
        this.accounts = response;
        this.cdr.detectChanges();
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.accountForm.reset({
        accountType: 'SAVINGS',
        initialBalance: 0
      });
    }
  }

  saveAccount(): void {
    if (this.accountForm.valid) {
      this.accountService
        .createAccount(this.accountForm.value)
        .subscribe({
          next: () => {
            this.loadAccounts();
            this.toggleForm(); 
            this.cdr.detectChanges(); 
          },
          error: (err) => {
            console.error('Error creating account:', err);
          }
        });
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
}