import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const { email, password } = this.registerForm.value;
    const auth = (window as any).firebase?.auth;

    if (!auth) {
      this.errorMessage = 'Service d’authentification non disponible. Rechargez la page.';
      this.loading = false;
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      this.successMessage = 'Inscription réussie !';
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = this.firebaseErrorFR(error.code);
    } finally {
      this.loading = false;
    }
  }

  firebaseErrorFR(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Cet email est déjà utilisé.';
      case 'auth/invalid-email': return 'Adresse email invalide.';
      case 'auth/weak-password': return 'Mot de passe trop faible (6 caractères min).';
      default: return 'Erreur lors de l’inscription.';
    }
  }
}