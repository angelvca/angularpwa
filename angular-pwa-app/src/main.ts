import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js').then((registration) => {
      console.log('Service worker registered:', registration);
    }).catch((error) => {
      console.error('Service worker registration failed.', error);
    })
  });
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error('Error al iniciar la aplicación: ', err));