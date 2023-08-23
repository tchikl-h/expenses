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

  get lastPage(): number {
    return Math.ceil((this.length || 0) / (this.pageSize || 1)) - 1;
  }

  onPageChange(limit: number, page: number): void {
    this.handlePageChange.emit({ limit, page });
  }
}
