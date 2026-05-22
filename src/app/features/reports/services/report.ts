import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/reports';

  getReports(
    clientId: string,
    startDate: string,
    endDate: string
  ) {

    return this.http.get<any[]>(

      `${this.apiUrl}?clientId=${clientId}&startDate=${startDate}&endDate=${endDate}`

    );
  }
}