import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MockapiService } from './services/mockapi.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-pwa-app';
  companies: any[] = [];
  isEditing = false;
  currentCompanyId: string | null = null;
  
  form = signal<FormGroup>(
    new FormGroup({
      idnumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tel: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      web: new FormControl(''),
      sector: new FormControl(''),
      langs: new FormControl([]),
      employesCount: new FormControl(1),
      factoryCount: new FormControl(1),
    })
  );

  constructor(private mockapiService: MockapiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadCompanies();
    
    if (isPlatformBrowser(this.platformId)) {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/ngsw-worker.js').then((registration) => {
            console.log('Service worker registered:', registration);
          }).catch((error) => {
            console.error('Service worker registration failed.', error);
          });
        });
      }

      window.addEventListener('online', () => {
        console.log('Conexión restablecida. Reenviando solicitudes pendientes...');
        this.mockapiService.resendPendingRequests();
        this.loadCompanies(); // Recargar datos después de reconectar
      });

      if (navigator.onLine) {
        console.log('La aplicación se cargó con conexión a Internet. Reenviando solicitudes pendientes...');
        this.mockapiService.resendPendingRequests();
      }
    }
  }

  loadCompanies(): void {
    this.mockapiService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        console.log('Datos obtenidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.form().valid) {
      const formData = this.form().value;

      if (this.isEditing && this.currentCompanyId) {
        // Actualizar empresa existente
        this.mockapiService.updateCompany(this.currentCompanyId, formData).subscribe({
          next: (response) => {
            console.log('Datos actualizados con éxito:', response);
            alert('Empresa actualizada correctamente');
            this.resetForm();
            this.loadCompanies();
          },
          error: (error) => {
            console.error('Error al actualizar la empresa:', error);
            alert('Hubo un error al actualizar la empresa');
          }
        });
      } else {
        // Crear nueva empresa
        this.mockapiService.createCompany(formData).subscribe({
          next: (response) => {
            console.log('Datos enviados con éxito:', response);
            alert('Empresa creada correctamente');
            this.resetForm();
            this.loadCompanies();
          },
          error: (error) => {
            console.error('Error al crear la empresa:', error);
            alert('Hubo un error al crear la empresa');
          }
        });
      }
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }

  editCompany(company: any): void {
    this.isEditing = true;
    this.currentCompanyId = company.id;
    this.form().patchValue({
      idnumber: company.idnumber,
      name: company.name,
      tel: company.tel,
      email: company.email,
      web: company.web,
      sector: company.sector,
      langs: company.langs || [],
      employesCount: company.employesCount,
      factoryCount: company.factoryCount
    });
  }

  deleteCompany(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      this.mockapiService.deleteCompany(id).subscribe({
        next: () => {
          alert('Empresa eliminada correctamente');
          this.loadCompanies();
        },
        error: (error) => {
          console.error('Error al eliminar la empresa:', error);
          alert('Hubo un error al eliminar la empresa');
        }
      });
    }
  }

  resetForm(): void {
    this.form().reset({
      employesCount: 1,
      factoryCount: 1,
      langs: []
    });
    this.isEditing = false;
    this.currentCompanyId = null;
  }
}