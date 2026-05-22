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
  pdfBase64: string | null = null;

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

  generatePdf(): void {
    if (this.reportForm.valid) {
      const { clientId, startDate, endDate } = this.reportForm.value;
      
      this.reportService.generatePdf(clientId, startDate, endDate)
        .subscribe((res: any) => {
          this.pdfBase64 = res.base64;
          this.cdr.detectChanges();
        });
    }
  }

  downloadPdf(): void {
    if (!this.pdfBase64) return;
    
    const linkSource = `data:application/pdf;base64,${this.pdfBase64}`;
    const downloadLink = document.createElement("a");
    const fileName = "reporte_cuenta.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}