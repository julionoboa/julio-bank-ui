import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/movements';

  getMovements() {

    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  createMovement(movement: any) {

    return this.http.post(
      this.apiUrl,
      movement
    );
  }

  getMovementsByAccount(accountNumber?: string): Observable<any[]> {
  const url = accountNumber 
    ? `${this.apiUrl}/account/${accountNumber}` 
    : this.apiUrl;
  return this.http.get<any[]>(url);
}
}