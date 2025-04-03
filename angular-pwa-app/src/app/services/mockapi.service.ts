import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { db, PendingRequest } from '../db/db';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockapiService {
  private mockApiUrl = 'https://67b7d65f2bddacfb271016c1.mockapi.io/empresa';

  constructor(private http: HttpClient) {}

  // CREATE
  createCompany(companyData: any): Observable<any> {
    if (navigator.onLine) {
      return this.http.post(this.mockApiUrl, companyData).pipe(
        catchError((error: HttpErrorResponse) => {
          this.saveRequest(this.mockApiUrl, 'POST', companyData);
          return of(null);
        })
      );
    } else {
      this.saveRequest(this.mockApiUrl, 'POST', companyData);
      return of(null);
    }
  }

  // READ (all)
  getCompanies(): Observable<any> {
    return this.http.get(this.mockApiUrl);
  }

  // READ (single)
  getCompany(id: string): Observable<any> {
    return this.http.get(`${this.mockApiUrl}/${id}`);
  }

  // UPDATE
  updateCompany(id: string, companyData: any): Observable<any> {
    if (navigator.onLine) {
      return this.http.put(`${this.mockApiUrl}/${id}`, companyData).pipe(
        catchError((error: HttpErrorResponse) => {
          this.saveRequest(`${this.mockApiUrl}/${id}`, 'PUT', companyData);
          return of(null);
        })
      );
    } else {
      this.saveRequest(`${this.mockApiUrl}/${id}`, 'PUT', companyData);
      return of(null);
    }
  }

  // DELETE
  deleteCompany(id: string): Observable<any> {
    if (navigator.onLine) {
      return this.http.delete(`${this.mockApiUrl}/${id}`).pipe(
        catchError((error: HttpErrorResponse) => {
          this.saveRequest(`${this.mockApiUrl}/${id}`, 'DELETE', null);
          return of(null);
        })
      );
    } else {
      this.saveRequest(`${this.mockApiUrl}/${id}`, 'DELETE', null);
      return of(null);
    }
  }

  private saveRequest(url: string, method: string, body: any): void {
    db.pendingRequests.add({ url, method, body })
      .then(() => console.log('Solicitud guardada en IndexedDB'))
      .catch(err => console.error('Error al guardar la solicitud:', err));
  }

  resendPendingRequests(): void {
    db.pendingRequests.toArray().then(requests => {
      requests.forEach(request => {
        this.http.request(request.method, request.url, { body: request.body }).subscribe({
          next: () => {
            console.log('Solicitud reenviada:', request);
            db.pendingRequests.delete(request.id!);
          },
          error: (err) => {
            console.error('Error al reenviar la solicitud:', err);
          }
        });
      });
    });
  }
}