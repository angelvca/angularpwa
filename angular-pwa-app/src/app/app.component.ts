import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MockapiService } from './services/mockapi.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pwa-app'
  companies: any[] = [];
  
  form = signal<FormGroup>(
    new FormGroup({
        name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
        tel: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        web: new FormControl(''),
        sector: new FormControl(''),
        langs: new FormControl([]),
        employesCount: new FormControl(1),
      })
    );

    constructor(private mockapiService: MockapiService) {}

    ngOnInit(): void {
      this.loadCompanies();
    }

    loadCompanies(): void {
      this.mockapiService.getCompanies().subscribe({
        next: (data) => {
          this.companies = data; // Almacena los datos en la variable companies
          console.log('Datos obtenidos:', data);
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
    }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.form().valid) {
      const formData = this.form().value;

      // Enviar los datos a MockAPI
      this.mockapiService.createCompany(formData).subscribe({
        next: (response) => {
          console.log('Datos enviados con éxito:', response);
          alert('Formulario enviado correctamente');
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
          alert('Hubo un error al enviar el formulario');
        },
        complete: () => {
          console.log('La solicitud se ha completado');
        }
      });
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }

  }
