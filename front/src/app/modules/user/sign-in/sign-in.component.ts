import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public asFormControl = (formControl: AbstractControl | null): FormControl =>
    formControl as FormControl;

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      // Mark all form controls as touched to trigger validation errors
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.errorMessage = null;
        this.router.navigate(['/post/create-post']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
