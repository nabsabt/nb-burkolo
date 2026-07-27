import { Component, DOCUMENT, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { ModalService } from '../../@Service/modal.service';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tender-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [FormField, MatSelectModule, MatInputModule, MatSnackBarModule, CommonModule],
  providers: [],
  standalone: true,
})
export class TenderModalComponent implements OnInit, OnDestroy {
  public modalService = inject(ModalService);

  private documnet = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private snackbar = inject(MatSnackBar);

  public locations = signal<Array<string>>([
    'Budapest I',
    'Budapest II',
    'Budapest III',
    'Budapest IV',
    'Budapest V',
    'Budapest VI',
    'Budapest VII',
    'Budapest VIII',
    'Budapest IX',
    'Budapest X',
    'Budapest XI',
    'Budapest XII',
    'Budapest XIII',
    'Budapest XIV',
    'Budapest XV',
    'Budapest XVI',
    'Budapest XVII',
    'Budapest XVIII',
    'Budapest XIX',
    'Budapest XX',
    'Budapest XXI',
    'Budapest XXII',
    'Budapest XXIII',
    'Budapest agglomeráció',
  ]);
  public pavementTypes = signal<Array<string>>([
    'Hidegburkolás',
    'Melegburkolás',
    'Kőműves burkolás',
  ]);

  public modalAnimation = signal<'open-animation' | 'close-animation' | ''>('');

  private formModel = signal<{
    name: string;
    location: string;
    typeOfPavement: string;
    shortDesc: string;
    longDesc: string;
    email: string;
    phone: string;
  }>({
    name: '',
    location: '',
    typeOfPavement: '',
    shortDesc: '',
    longDesc: '',
    email: '',
    phone: '',
  });
  public tenderForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.name);
    email(schemaPath.email, { message: 'Nem jó e-email formátum!' });
    required(schemaPath.location);
    required(schemaPath.typeOfPavement);
    required(schemaPath.shortDesc);
    required(schemaPath.longDesc);
    required(schemaPath.email);
    required(schemaPath.phone);
  });
  constructor() {}

  ngOnInit(): void {
    this.modalAnimation.set('open-animation');
    this.renderer.setStyle(this.documnet.body, 'overflow', 'hidden');
  }

  public onSubmitForm() {
    const formValues = {
      name: this.formModel().name,
      location: this.formModel().location,
      typeOfPavement: this.formModel().typeOfPavement,
      shortDesc: this.formModel().shortDesc,
      longDesc: this.formModel().longDesc,
      email: this.formModel().email,
      phone: this.formModel().phone,
    };
    console.log(formValues);
    this.snackbar.open('Kérés elküldve!', '', {
      duration: 3000,
      panelClass: 'warning-snackbar',
    });

    this.onCloseModal();
  }

  /**
   * Manage modal float-in/out animation,
   * and open/closing modal via service->
   */
  public onCloseModal() {
    setTimeout(() => {
      this.modalService.closeModal();
    }, 500);
    this.modalAnimation.set('close-animation');
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(this.documnet.body, 'overflow', 'auto');
  }
}
