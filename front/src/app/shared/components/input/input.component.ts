import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent {
  
  @Input() type: 'text' | 'password' = 'text';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;

  inputValue: string = '';
  inputType: 'text' | 'password' = 'text';

  get isPassword(): boolean {
    return this.type === 'password';
  }

  ngOnInit() {
    this.inputType = this.type;
  }

  toggleInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

}

