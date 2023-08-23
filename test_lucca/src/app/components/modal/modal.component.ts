import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  showModal: boolean;
  @Output() cancelEditEvent = new EventEmitter<void>();

  constructor(private modalService: ModalService) {
    this.modalService.showModal$.subscribe((showModal) => {
      this.showModal = showModal;
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
