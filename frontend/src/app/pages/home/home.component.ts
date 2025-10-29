import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Ajoute ça pour routerLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Ajoute RouterModule ici
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}