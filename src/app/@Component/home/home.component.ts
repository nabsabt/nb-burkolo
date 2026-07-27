import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesComponent } from '../section/services/services.component';
import { PricesComponent } from '../section/prices/prices.component';
import { PortfolioComponent } from '../section/portfolio/portfolio.component';
import { ContactComponent } from '../section/contact/contact.component';
import { TenderModalComponent } from '../modal/modal.component';
import { ModalService } from '../../@Service/modal.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    ServicesComponent,
    PricesComponent,
    PortfolioComponent,
    ContactComponent,
    TenderModalComponent,
  ],
})
export class HomeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public modalService = inject(ModalService);
  public heroBgImgClass = signal<string>('');
  constructor() {}
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  private jumpToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      const yOffset = window.innerWidth < 992 ? 65 : 75; // Adjust offset for mobile view
      const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  public onHeroBgImgLoaded() {
    this.heroBgImgClass.set('img-visible');
  }
}
