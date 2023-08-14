import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
})
export class DaySelectorComponent {
  @Input() label?: string;
  @Input() control!: FormControl;
  @ViewChild('dateInput') dateInput!: ElementRef;
  isDateSelected: boolean = false;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.isDateSelected = !!value;
    });
  }
  getCurrentDate(): string | null {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  openDateSelector() {
    this.dateInput.nativeElement.showPicker();
  }

  resetDate(event: Event) {
    this.control.setValue('');
    event.stopPropagation();
  }

  ngAfterViewInit() {
    // This ensures that the date selector opens the first time you click the input after it becomes visible.
    this.dateInput.nativeElement.dispatchEvent(new Event('click'));
  }
}
