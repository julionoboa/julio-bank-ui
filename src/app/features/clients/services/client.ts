import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/clients';

  getClients() {

    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, clientData);
  }
}