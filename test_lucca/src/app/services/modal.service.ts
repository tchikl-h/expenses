import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  showModal$: Observable<boolean> = this.showModalSubject.asObservable();

  openModal() {
    this.showModalSubject.next(true);
  }

  closeModal() {
    this.showModalSubject.next(false);
  }

  saveChanges() {
    this.showModalSubject.next(false);
  }
}
