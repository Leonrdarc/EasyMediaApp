import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalPages!: number;
  @Input() itemsPerPage: number = 3;
  @Input() currentPage: number = 1;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  
  pagesToShow: number[] = [];

  ngOnChanges() {
    let numbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      numbers.push(i);
    }
    this.pagesToShow = numbers;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.currentPageChange.emit(this.currentPage);
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.currentPageChange.emit(this.currentPage);
  }
}
