import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, BrainCircuit } from 'lucide-angular';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../dtos/auth.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: `./login.html`,
})
export class Login {
  //Declare icons
  readonly BrainCircuit = BrainCircuit;

  //Declare variables
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    const emailVal = this.email;
    const passVal = this.password;

    this.error.set('');

    if (!emailVal || !passVal) {
      this.error.set('Email and Password are required!');
      return;
    }

    this.isLoading.set(true);

    const request: AuthRequest = {
      email: emailVal(),
      password: passVal(),
    };

    setTimeout(() => {
      this.authService.login(request).subscribe({
        next: (response) => {
          console.log('Login Success!');
          // console.log('Token in Storage:', localStorage.getItem('note_hub_token'));

          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login Failed', err);
          this.error.set(err.error?.message || 'Invalid email or password');
          this.isLoading.set(false);
        },
      });
      // this.router.navigate(['/dashboard']);
      // this.isLoading.set(false);
    }, 500);
  }
}
