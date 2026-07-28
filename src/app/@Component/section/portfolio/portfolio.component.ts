import { Component, effect, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

@Component({
  selector: 'portfolio-section',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  imports: [],
})
export class PortfolioComponent implements OnInit {
  @ViewChild('imgGallery')
  set imgGallery(el: ElementRef<HTMLElement> | undefined) {
    this.galleryEl.set(el?.nativeElement ?? null);
  }
  private galleryEl = signal<HTMLElement | null>(null);
  private lightbox!: PhotoSwipeLightbox | undefined;
  public imageUrls = signal<Array<{ thumbURL: string; imgUrl: string; name: string }>>([
    {
      thumbURL: 'assets/imgs/portfolio_images/minta1_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta1.webp',
      name: 'Teljes privát fürdő',
    },
    {
      thumbURL: 'assets/imgs/portfolio_images/minta2_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta2.webp',
      name: 'Egyedi burkolás',
    },
    {
      thumbURL: 'assets/imgs/portfolio_images/minta3_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta3.webp',
      name: 'Otthonos garzon',
    },
    {
      thumbURL: 'assets/imgs/portfolio_images/minta4_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta4.webp',
      name: 'Retro fürdőszoba',
    },
    {
      thumbURL: 'assets/imgs/portfolio_images/minta5_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta5.webp',
      name: 'Modern design',
    },
    {
      thumbURL: 'assets/imgs/portfolio_images/minta6_thumb.webp',
      imgUrl: 'assets/imgs/portfolio_images/minta6.webp',
      name: 'Világos feeling',
    },
  ]);

  constructor() {
    effect(() => {
      const el = this.galleryEl();
      if (el) {
        queueMicrotask(() => this.initLightbox(el));
      } else {
        this.destroyLightbox();
      }
    });
  }
  ngOnInit(): void {}

  private async initLightbox(el: HTMLElement) {
    this.destroyLightbox();
    const links = el.querySelectorAll<HTMLAnchorElement>('a[href]');
    for (const link of links) {
      const img = new Image();
      img.src = link.href;

      try {
        await img.decode();
      } catch {
        // fallback if decode fails (cross-origin / older browsers)
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }

      // only set if we got something valid
      if (img.naturalWidth && img.naturalHeight) {
        link.dataset['pswpWidth'] = String(img.naturalWidth);
        link.dataset['pswpHeight'] = String(img.naturalHeight);
      }
    }
    this.lightbox = new PhotoSwipeLightbox({
      gallery: el,
      children: 'a',
      imageClickAction: 'next',
      tapAction: 'next',

      pswpModule: () => import('photoswipe'),
    });

    this.lightbox.init();
  }

  private destroyLightbox() {
    this.lightbox?.destroy();
    this.lightbox = undefined;
  }
}
