import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent {
  @Input() length: number | null;
  @Input() pageSize: number | null;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageIndex: number | null;
  @Output() handlePageChange: EventEmitter<{ limit: number; page: number }> =
    new EventEmitter();

  getLastPage(): number {
    return Math.ceil((this.length || 0) / (this.pageSize || 1)) - 1;
  }

  onSelectChange(event: Event) {
    const selectedLimit = parseInt((event.target as HTMLSelectElement).value);
    this.onPageChange(selectedLimit, 0);
  }

  onPageChange(limit: number, page: number): void {
    this.handlePageChange.emit({ limit, page });
  }
}
