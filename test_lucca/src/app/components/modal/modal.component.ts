import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  showModal: boolean;
  @Output() cancelEditEvent = new EventEmitter<void>();
  @ViewChild('focusElement', { read: ElementRef })
  focusElement: ElementRef;

  constructor(private modalService: ModalService) {
    this.modalService.showModal$.subscribe((showModal) => {
      this.showModal = showModal;
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        if (this.focusElement) {
          this.focusElement.nativeElement.focus();
        }
      }, 0);
    });
  }

  onCloseModal() {
    this.cancelEditEvent.emit();
    this.modalService.closeModal();
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}
