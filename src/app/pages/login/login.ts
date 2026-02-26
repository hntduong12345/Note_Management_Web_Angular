import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, BrainCircuit } from 'lucide-angular';
import { CommonModule } from '@angular/common';

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

  /*  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  */

  onLogin(): void {
    const emailVal = this.email;
    const passVal = this.password;

    this.error.set('');

    if (!emailVal || !passVal) {
      this.error.set('Email and Password are required!');
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      // this.authService.login(this.email, this.password);
      // this.router.navigate(['/dashboard']);
      this.isLoading.set(false);
    }, 500);
  }
}
