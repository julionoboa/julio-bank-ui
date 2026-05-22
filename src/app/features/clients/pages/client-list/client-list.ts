import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  private clientService = inject(ClientService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  
  showForm = false;
  clientForm!: FormGroup;

  clients: any[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
  }

  initForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      identification: ['', Validators.required],
      gender: [''],
      age: [null],
      address: [''],
      phone: [''],
      email: ['', [Validators.email]],
      password: ['', Validators.required]
    });
  }

  loadClients(): void {
    this.clientService.getClients()
      .subscribe((response: any[]) => {
        this.clients = response;
        this.cdr.detectChanges();
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.clientForm.reset();
    }
  }

  saveClient(): void {
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value)
        .subscribe({
          next: (newClient) => {
            this.loadClients();
            this.toggleForm();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error al crear el cliente:', err);
          }
        });
    } else {
      this.clientForm.markAllAsTouched(); 
    }
  }
}