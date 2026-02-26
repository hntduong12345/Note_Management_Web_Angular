import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, BrainCircuit } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: `./register.html`,
})
export class Register {
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

  onRegister(): void {
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
