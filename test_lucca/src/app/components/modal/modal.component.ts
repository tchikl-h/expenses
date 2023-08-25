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
  // Property to control the visibility of the modal
  showModal: boolean;

  // Output event for canceling edits
  @Output() cancelEditEvent = new EventEmitter<void>();

  // ViewChild to access an element in the template
  @ViewChild('focusElement', { read: ElementRef })
  focusElement: ElementRef;

  // Subject to track component destruction
  destroyed = new Subject();

  constructor(private modalService: ModalService) {
    // Subscribe to the showModal$ observable from ModalService
    this.modalService.showModal$
      .pipe(takeUntil(this.destroyed))
      .subscribe((showModal) => {
        // Update the showModal property
        this.showModal = showModal;

        // Use a timeout to ensure the DOM has updated before focusing
        setTimeout(() => {
          if (this.focusElement) {
            this.focusElement.nativeElement.focus();
          }
        }, 0);
      });
  }

  // Method called when the component is being destroyed
  ngOnDestroy(): void {
    // Completing the destruction subject to prevent memory leaks
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  // Method to close the modal and emit a cancel event
  onCloseModal() {
    this.cancelEditEvent.emit();
    this.modalService.closeModal();
  }

  // Method to prevent clicks within the modal from propagating
  onContentClick(event: Event) {
    event.stopPropagation();
  }
}
