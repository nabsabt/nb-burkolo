import { Component, inject } from '@angular/core';
import { ModalService } from '../../../@Service/modal.service';

@Component({
  selector: 'contact-section',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [],
})
export class ContactComponent {
  public modalService = inject(ModalService);
}
