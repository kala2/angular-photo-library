import { NgOptimizedImage } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { ImageItem } from '@features/photo/interfaces/image.interface'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { appendOrDelete } from '@app/shared/utils/utils'

@Component({
  selector: 'app-photo',
  imports: [NgOptimizedImage, MatIconButton, MatIcon],
  template: `
    <div class="image-container">
      <img
        [ngSrc]="image().url"
        [alt]="'Image ' + image().id"
        width="300"
        height="300"
        [priority]="image().id <= 10" />
      <div class="image-overlay">
        <span class="image-id">#{{ image().id }}</span>
        <button matIconButton (click)="onFavoriteClick(image().url)" class="image-favorite">
          <mat-icon
            >{{ favorites().includes(image().url) ? 'favorite' : 'favorite_border' }}
          </mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: `
    .image-container {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      height: 300px;
      cursor: pointer;

      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }

    .image-container:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      padding: 10px;
      transform: translateY(100%);
      transition: transform 0.2s ease;
    }

    img {
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }

    .image-container:hover .image-overlay {
      transform: translateY(0);
    }

    .image-id {
      color: white;
      font-weight: bold;
      font-size: 14px;
      position: absolute;
      bottom: 10px;
    }

    .image-favorite {
      position: absolute;
      top: 25px;
      right: 5px;

      mat-icon {
        color: #ff0000;
      }
    }
  `
})
export class PhotoComponent {
  image = input.required<ImageItem>()

  localStorageService = inject(LocalStorageService)

  favorites = this.localStorageService.signal('favorites')

  onFavoriteClick(url: string) {
    const favorites = appendOrDelete(this.favorites() || [], url)

    this.localStorageService.set('favorites', favorites)
  }
}
