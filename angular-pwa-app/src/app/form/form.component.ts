import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData = { name: '', email: '' };

  submitForm(event: Event) {
    event.preventDefault();
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.formData)
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del servidor:', data))
    .catch(error => console.error('Error:', error));
  }
}
