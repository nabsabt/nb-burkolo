import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  @ViewChild('navbarSupportedContent') navbarSupportedContent: ElementRef;

  ngOnInit(): void {}

  public collapseNavbar() {
    const navbar = this.navbarSupportedContent.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
