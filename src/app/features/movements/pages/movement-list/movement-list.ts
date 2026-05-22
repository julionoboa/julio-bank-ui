import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MovementService } from '../../services/movement';

@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './movement-list.html',
  styleUrl: './movement-list.css',
})
export class MovementList implements OnInit {

  private movementService = inject(MovementService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  movements: any[] = [];
  allMovements: any[] = []; 
  
  showForm = false;
  movementForm!: FormGroup;
  filterAccount = '';

  ngOnInit(): void {
    this.initForm();
    this.loadMovements();
  }

  initForm(): void {
    this.movementForm = this.fb.group({
      accountId: ['', Validators.required],
      movementType: ['DEPOSIT', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    });
  }

  loadMovements(): void {
    this.movementService.getMovements()
      .subscribe((response: any[]) => {
        this.allMovements = response;
        this.movements = response;
        this.cdr.detectChanges();
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.movementForm.reset({
        movementType: 'DEPOSIT',
        amount: 0
      });
    }
  }

  saveMovement(): void {
    if (this.movementForm.valid) {
      this.movementService
        .createMovement(this.movementForm.value)
        .subscribe({
          next: () => {
            this.loadMovements();
            this.toggleForm();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error creating movement:', err);
          }
        });
    } else {
      this.movementForm.markAllAsTouched();
    }
  }

  onFilterChange(): void {
    if (!this.filterAccount.trim()) {
      this.movements = this.allMovements;
    } else {
      this.movements = this.allMovements.filter(m => 
        m.accountNumber?.toString().includes(this.filterAccount)
      );
    }
    this.cdr.detectChanges();
  }
}