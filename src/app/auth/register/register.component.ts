import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  step: 'basic' | 'password' | 'personal' = 'basic';
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
  get firstNameControl() { return this.registerForm.get('firstName'); }
  get lastNameControl() { return this.registerForm.get('lastName'); }
  
  get passwordsMatch() {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  onNextStep() {
    if (this.step === 'basic' && this.emailControl?.valid) {
      this.step = 'password';
    } else if (this.step === 'password' && this.passwordControl?.valid && 
               this.confirmPasswordControl?.valid && this.passwordsMatch) {
      this.step = 'personal';
    }
  }

  onPrevStep() {
    if (this.step === 'password') {
      this.step = 'basic';
    } else if (this.step === 'personal') {
      this.step = 'password';
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.firstName,
        this.registerForm.value.lastName
      ).subscribe({
        next: () => {
          this.router.navigate(['/account/manage']);
        },
        error: (err) => {
          this.error = 'Registration failed. Please try again.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
