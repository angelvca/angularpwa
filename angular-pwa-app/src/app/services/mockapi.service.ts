import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockapiService {
  private mockApiUrl = 'https://67b7d65f2bddacfb271016c1.mockapi.io'; // Reemplázalo con tu URL

  constructor(private http: HttpClient) {}

  // Método para enviar datos
  createCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.mockApiUrl}/empresa`, companyData);
  }

  // Método para obtener todos los datos
  getCompanies(): Observable<any> {
    return this.http.get(`${this.mockApiUrl}/empresa`);
  }
}
