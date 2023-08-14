import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder?: string = '';  // Default to an empty string if not provided
  @Input() type: string = 'text'; // default to text if not provided
  @Input() control!: FormControl;
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
