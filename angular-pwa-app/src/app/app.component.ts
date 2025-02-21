import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pwa-app'
  form = signal<FormGroup>(
    new FormGroup({
        name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
        tel: new FormControl(''),
        email: new FormControl(''),
        web: new FormControl(''),
        sector: new FormControl(''),
        langs: new FormControl([]),
        employesCount: new FormControl(1),
      })
    );
  }
