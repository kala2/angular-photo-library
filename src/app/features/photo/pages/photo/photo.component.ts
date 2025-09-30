import { Component, computed, inject, WritableSignal } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { LocalStorageService } from '@shared/services/local-storage.service'
import { appendOrDelete } from '@shared/utils/utils'
import { ImageItem } from '@features/photo/interfaces/image.interface'

@Component({
  selector: 'app-photo-page',
  imports: [MatButton, RouterLink, MatIcon],
  template: `
    <div class="photo-page">
      <div class="top-bar">
        <button mat-stroked-button color="primary" routerLink="..">
          <mat-icon>arrow_back</mat-icon> Back
        </button>
      </div>

      <div class="photo-container">
        <img [src]="url" alt="image" />
      </div>

      <div class="bottom-bar">
        <button matButton="filled" (click)="toggleFavorite()">
          {{ favoritesSelected().includes(id) ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
    </div>
  `,
  styles: `
    .photo-page {
      display: flex;
      flex-direction: column;
    }

    .top-bar {
      padding: 10px;
      display: flex;
      align-items: center;
    }

    .photo-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }

    .photo-container img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
    }

    .bottom-bar {
      padding: 15px;
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }
  `
})
export class PhotoComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  localStorageService = inject(LocalStorageService)

  favorites: WritableSignal<ImageItem[]> = this.localStorageService.signal('favorites')

  favoritesSelected = computed(() => (this.favorites() || []).map(({ id }) => id))

  id = Number(this.route.snapshot.queryParamMap.get('id'))
  url = this.route.snapshot.queryParamMap.get('url')?.replaceAll('300', '600') || ''

  toggleFavorite() {
    const item = { id: +this.id, url: this.url }

    const favorites = appendOrDelete(this.favorites() || [], item, ({ id }) => id === item.id)

    this.localStorageService.set('favorites', favorites)
  }
}
