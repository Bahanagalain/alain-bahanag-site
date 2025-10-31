import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { signOut } from 'firebase/auth';  // Pour logout Firebase

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Mock data pour "Mes Formations" (grille 3 cards statiques)
  mesFormations = [
    {
      titre: 'Audit Gratuit IA',
      description: 'Découvrez comment booster votre business avec l\'IA.',
      statut: 'En cours',
      progression: 25,
      cta: 'Continuer'
    },
    {
      titre: 'Formation React Native',
      description: 'Développez des apps mobiles cross-platform.',
      statut: 'Terminée',
      progression: 100,
      cta: 'Certificat'
    },
    {
      titre: 'SEO Avancé',
      description: 'Optimisez votre site pour Google et les leads.',
      statut: 'À commencer',
      progression: 0,
      cta: 'Démarrer'
    }
  ];

  // Mock data pour "Mes Services" (table 3 lignes statiques)
  mesServices = [
    {
      projet: 'Site Web Freelance',
      statut: 'En cours',
      deadline: '15 Nov 2025',
      prix: '€1,200',
      actions: 'Voir détails'
    },
    {
      projet: 'Automatisation n8n',
      statut: 'Terminé',
      deadline: '28 Oct 2025',
      prix: '€800',
      actions: 'Facture'
    },
    {
      projet: 'Campagne Ads Google',
      statut: 'En attente',
      deadline: '05 Nov 2025',
      prix: '€500',
      actions: 'Modifier'
    }
  ];

  constructor(private router: Router) {}

  // ✅ Logout : Déconnecte Firebase et redirige vers home
  async onLogout() {
    const auth = (window as any).firebase?.auth;  // Global comme login/register
    if (!auth) {
      return;
    }

    try {
      await signOut(auth);
      this.router.navigate(['/home']);  // Ou '/' si redirect vers home
    } catch (error) {
      // Silencieux en prod – UI feedback si besoin plus tard
    }
  }
}