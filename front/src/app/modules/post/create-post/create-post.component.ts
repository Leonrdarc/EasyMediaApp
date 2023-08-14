import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  public asFormControl = (formControl: AbstractControl | null): FormControl =>
    formControl as FormControl;

  form: FormGroup;
  showModal = false;
  errorMessage: string | null = null;

  post: {
    title: string;
    message: string;
    user: {
      name: string;
    };
    date: string;
  };

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.post = {
      title: 'Your post title',
      message: 'Create message for share with your friends.',
      user: {
        name: JSON.parse(localStorage.getItem('user') ?? '{}').name ?? '',
      },
      date: new Date().toISOString(),
    };
    this.form.valueChanges.subscribe((value) => {
      this.post = {
        ...this.post,
        title: value.title.length ? value.title : 'Your post title',
        message: value.message.length
          ? value.message
          : 'Create message for share with your friends.',
        date: new Date().toISOString(),
      };
    });
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.form.invalid) {
      // Mark all form controls as touched to trigger validation errors
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    this.postService.createPost(this.form.value).subscribe({
      next: () => {
        this.errorMessage = null;
        this.showModal = true;
        this.form.reset();
        this.post = {
          title: 'Your post title',
          message: 'Create message for share with your friends.',
          user: {
            name: JSON.parse(localStorage.getItem('user') ?? '{}').name ?? '',
          },
          date: new Date().toISOString(),
        };
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        this.showModal = true;
      },
    });
  }
}
