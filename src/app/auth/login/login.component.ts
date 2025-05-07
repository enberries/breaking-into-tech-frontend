import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  step: 'email' | 'password' = 'email';
  loading = false;
  error = '';
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onNextStep() {
    if (this.step === 'email' && this.emailControl?.valid) {
      this.userEmail = this.emailControl.value;
      this.step = 'password';
    }
  }

  onBack() {
    this.step = 'email';
    this.error = '';
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: () => {
          this.router.navigate(['/account/manage']);
        },
        error: (err) => {
          this.error = 'Invalid email or password';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
