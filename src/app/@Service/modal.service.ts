import { effect, Service, signal } from '@angular/core';

@Service()
export class ModalService {
  private isModalOpened = signal<boolean>(false);
  public $isModalOpened = this.isModalOpened.asReadonly();

  constructor() {
    effect(() => {
      console.log(`modalservice -> modal is ${this.isModalOpened()} `);
    });
  }

  public openModal() {
    this.isModalOpened.set(true);
  }

  public closeModal() {
    this.isModalOpened.set(false);
  }

  public toggleModal() {
    this.isModalOpened.set(!this.isModalOpened());
  }
}
