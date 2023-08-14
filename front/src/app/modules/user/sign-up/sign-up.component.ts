import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public asFormControl = (formControl: AbstractControl | null): FormControl =>
    formControl as FormControl;

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      {
        validators: this.checkPasswords,
      }
    );
  }

  checkPasswords(control: AbstractControl) {
    if (
      control.get('password')?.value !== control.get('passwordConfirm')?.value
    ) {
      return { passwordsMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.form.invalid) {
      // Mark all form controls as touched to trigger validation errors
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.errorMessage = null;
        this.router.navigate(['/post/create-post']);
      },
      error: () => {
        this.errorMessage = 'Error registering user';
      },
    });
  }
}
