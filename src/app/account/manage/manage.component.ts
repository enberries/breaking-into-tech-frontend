import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../auth/auth.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  activeTab: 'personal-info' | 'security' | 'preferences' = 'personal-info';
  isEditing = false;
  isSaving = false;
  updateSuccess = false;
  updateError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Get current user data
    this.user = this.authService.currentUser;
    
    if (this.user) {
      this.profileForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        email: this.user.email
      });
    }
  }

  switchTab(tab: 'personal-info' | 'security' | 'preferences'): void {
    this.activeTab = tab;
    this.isEditing = false;
    this.updateSuccess = false;
    this.updateError = '';
  }

  enableEditing(): void {
    this.isEditing = true;
    this.updateSuccess = false;
    this.updateError = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    
    // Reset form to original values
    if (this.user) {
      this.profileForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || ''
      });
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.updateSuccess = false;
      this.updateError = '';
      
      const updatedInfo = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value
      };
      
      this.authService.updateUserProfile(updatedInfo).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isEditing = false;
          this.isSaving = false;
          this.updateSuccess = true;
        },
        error: () => {
          this.updateError = 'Failed to update profile. Please try again.';
          this.isSaving = false;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
