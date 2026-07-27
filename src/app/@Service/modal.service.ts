import { Service, signal } from '@angular/core';

@Service()
export class ModalService {
  private isModalOpened = signal<boolean>(false);
  public $isModalOpened = this.isModalOpened.asReadonly();

  public openModal() {
    this.isModalOpened.set(true);
  }

  public closeModal() {
    this.isModalOpened.set(false);
  }
}
