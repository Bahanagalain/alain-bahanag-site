import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Racine → Home
  { path: 'home', component: HomeComponent },            // /home = Accueil
  { path: 'services', component: ServicesComponent },    // /services = Services
  { path: '**', redirectTo: '/home' }                    // 404 → Home
];