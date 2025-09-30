import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { appendOrDelete } from '@app/shared/utils/utils'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-photo-card',
  imports: [NgOptimizedImage, MatIconButton, MatIcon, RouterLink],
  template: `
    <div class="image-container" routerLink="/photos/{{ id() }}">
      <img
        ngSrc="https://picsum.photos/id/{{ id() }}/300/300"
        alt="Image {{ id() }}"
        width="300"
        height="300"
        [priority]="id() <= 9" />
      <div class="image-overlay">
        <span class="image-id">#{{ id() }}</span>
        <button matIconButton (click)="onFavoriteClick()" class="image-favorite">
          <mat-icon>{{ favorites().includes(id()) ? 'favorite' : 'favorite_border' }} </mat-icon>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCardComponent {
  id = input.required<number>()

  localStorageService = inject(LocalStorageService)

  favorites = this.localStorageService.signal<number[]>('favorites')

  onFavoriteClick() {
    event?.stopPropagation()

    const favorites = appendOrDelete(this.favorites() || [], this.id())

    this.localStorageService.set('favorites', favorites)
  }
}
