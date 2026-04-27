import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // 1. Inicializamos la app de Firebase usando tu environment
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // 2. Inicializamos la base de datos Firestore
    provideFirestore(() => getFirestore())
  ],
};
