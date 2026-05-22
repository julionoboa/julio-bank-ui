import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../services/report';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // 👈 Cambiamos a Formularios Reactivos
  ],
  templateUrl: './report-list.html',
  styleUrl: './report-list.css',
})
export class ReportList implements OnInit {

  private reportService = inject(ReportService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  reports: any[] = [];
  reportForm!: FormGroup;

  ngOnInit(): void {
    // Inicializamos el formulario de búsqueda
    this.reportForm = this.fb.group({
      clientId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  loadReports(): void {
    if (this.reportForm.valid) {
      const formValues = this.reportForm.value;

      this.reportService.getReports(
        formValues.clientId,
        formValues.startDate,
        formValues.endDate
      ).subscribe({
        next: (response: any[]) => {
          console.log(response);
          this.reports = response;
          this.cdr.detectChanges(); // 👈 Forzamos la actualización de la tabla
        },
        error: (err) => {
          console.error('Error fetching reports:', err);
        }
      });
    } else {
      this.reportForm.markAllAsTouched();
    }
  }
}