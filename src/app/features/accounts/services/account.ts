import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/accounts';

  getAccounts() {

    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  createAccount(account: any) {

    return this.http.post(
      this.apiUrl,
      account
    );
  }
}