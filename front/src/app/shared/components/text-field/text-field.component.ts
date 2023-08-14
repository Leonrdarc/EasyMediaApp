import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnChanges{
  @Input() label?: string;
  @Input() placeholder?: string = '';  // Default to an empty string if not provided
  @Input() control!: FormControl;
  @Input() rows: number = 1;
  @Input() maxCharacters?: number;
  length: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (this.control) {
      this.length = this.control.value ? this.control.value.length : 0;
      
      this.control.valueChanges.subscribe(value => {
        this.length = value ? value.length : 0;
      });
    }
  }
}
