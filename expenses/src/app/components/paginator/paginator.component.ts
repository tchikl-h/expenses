import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent {
  // Inputs received from parent component
  @Input() length: number | null;
  @Input() pageSize: number | null;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageIndex: number | null;

  // Output to emit page change event to parent component
  @Output() handlePageChange: EventEmitter<{ limit: number; page: number }> =
    new EventEmitter();

  // Method to calculate the last page based on length and pageSize
  getLastPage(): number {
    return Math.ceil((this.length || 0) / (this.pageSize || 1)) - 1;
  }

  // Method triggered when the page size selection changes
  onSelectChange(event: Event) {
    const selectedLimit = parseInt((event.target as HTMLSelectElement).value);
    this.onPageChange(selectedLimit, 0);
  }

  // Method to handle page change event and emit it to the parent
  onPageChange(limit: number, page: number): void {
    this.handlePageChange.emit({ limit, page });
  }
}
