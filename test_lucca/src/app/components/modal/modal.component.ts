import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnDestroy {
  showModal: boolean;
  @Output() cancelEditEvent = new EventEmitter<void>();
  @ViewChild('focusElement', { read: ElementRef })
  focusElement: ElementRef;
  // Subject to track component destruction
  destroyed = new Subject();

  constructor(private modalService: ModalService) {
    this.modalService.showModal$
      .pipe(takeUntil(this.destroyed))
      .subscribe((showModal) => {
        this.showModal = showModal;
        setTimeout(() => {
          // this will make the execution after the above boolean has changed
          if (this.focusElement) {
            this.focusElement.nativeElement.focus();
          }
        }, 0);
      });
  }

  ngOnDestroy(): void {
    // Completing the destruction subject
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onCloseModal() {
    this.cancelEditEvent.emit();
    this.modalService.closeModal();
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}
