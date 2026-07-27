import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../@Service/modal.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  @ViewChild('navbarSupportedContent') navbarSupportedContent: ElementRef;

  public modalService = inject(ModalService);
  ngOnInit(): void {}

  public collapseNavbar() {
    const navbar = this.navbarSupportedContent.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
