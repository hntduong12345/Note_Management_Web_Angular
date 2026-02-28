import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, BrainCircuit, Eye, EyeOff, CircleAlert } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../dtos/auth.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: `./register.html`,
})
export class Register {
  //Declare icons
  readonly BrainCircuit = BrainCircuit;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly CircleAlert = CircleAlert;

  //Declare variables
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');
  showPass = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Setup check validated password
  isPassValid = computed(() => this.password().length >= 8);
  isPassTyped = signal(false);

  onPasswordChange(value: string) {
    this.password.set(value);
    this.isPassTyped.set(true);
  }

  togglePass() {
    this.showPass.update((v) => !v);
  }

  onRegister(): void {
    const emailVal = this.email;
    const passVal = this.password;

    this.error.set('');

    if (!emailVal() || !passVal()) {
      this.error.set('Email and Password are required!');
      return;
    }

    if (!this.isPassValid()) {
      this.error.set('Password is invalid');
      return;
    }

    this.isLoading.set(true);

    const request: AuthRequest = {
      email: emailVal(),
      password: passVal(),
    };

    setTimeout(() => {
      this.authService.register(request).subscribe({
        next: (response) => {
          console.log('Register successfully');

          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login Failed', err);
          this.error.set(err.error?.message || 'Invalid email or password');
          this.isLoading.set(false);
        },
      });
      this.isLoading.set(false);
    }, 500);
  }
}
