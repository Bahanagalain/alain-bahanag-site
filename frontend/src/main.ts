import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Init Firebase global – UNIQUEMENT côté browser (SSR-safe)
if (typeof document !== 'undefined') {
  // Dynamic imports pour lazy load au client (évite bundle serveur)
  import('firebase/app').then(({ initializeApp }) => {
    import('firebase/auth').then(({ getAuth }) => {
      // Fallback config (hardcodée pour sécurité, ou via env si dispo)
      const firebaseConfig = {
        apiKey: "AIzaSyDPFcmEkMSRSruOQGp46oomeHGbz2iKHp4",
        authDomain: "alain-bahanag-site.firebaseapp.com",
        projectId: "alain-bahanag-site",
        storageBucket: "alain-bahanag-site.firebasestorage.app",
        messagingSenderId: "183834133645",
        appId: "1:183834133645:web:3833b8b519ec18c5f88ec4",
        measurementId: "G-EE1B3D8YYP"
      };
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      (window as any).firebase = { app, auth };
      console.log('Firebase init OK côté client !', auth);  // Debug temporaire – vire après test
    }).catch((err) => console.error('Erreur init auth Firebase:', err));
  }).catch((err) => console.error('Erreur init app Firebase:', err));
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));