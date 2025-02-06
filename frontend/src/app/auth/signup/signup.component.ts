import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      display_name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const { username, password, display_name } = this.signupForm.value;
    this.authService.signup(username, password, display_name).subscribe({
      next: () => {
        // After successful signup, navigate to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = 'Signup failed. Please try a different username.';
        console.error(err);
      }
    });
  }
}
