import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // Private BehaviorSubject to hold the modal state (initially false)
  private showModalSubject = new BehaviorSubject<boolean>(false);

  // Observable that emits the current modal state
  showModal$: Observable<boolean> = this.showModalSubject.asObservable();

  // Method to open the modal
  openModal() {
    this.showModalSubject.next(true);
  }

  // Method to close the modal
  closeModal() {
    this.showModalSubject.next(false);
  }

  // Method to save changes and close the modal
  saveChanges() {
    this.showModalSubject.next(false);
  }
}
