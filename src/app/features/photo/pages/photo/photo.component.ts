import { Location } from '@angular/common'
import { Component, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { ActivatedRoute } from '@angular/router'
import { LocalStorageService } from '@shared/services/local-storage.service'
import { appendOrDelete } from '@shared/utils/utils'

@Component({
  selector: 'app-photo',
  imports: [MatButton, MatIcon],
  template: `
    <div class="photo-page">
      <div class="top-bar">
        <button mat-stroked-button color="primary" (click)="location.back()">
          <mat-icon>arrow_back</mat-icon> Back
        </button>
      </div>

      <div class="photo-container">
        <img src="https://picsum.photos/id/{{ id }}/600/600" alt="image" />
      </div>

      <div class="bottom-bar">
        <button matButton="filled" (click)="toggleFavorite()">
          {{ favorites().includes(id) ? 'Remove from Favorites' : 'Add to Favorites' }}
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
  location = inject(Location)
  localStorageService = inject(LocalStorageService)

  favorites = this.localStorageService.signal<number[]>('favorites')

  id = Number(this.route.snapshot.paramMap.get('id'))

  toggleFavorite() {
    const favorites = appendOrDelete(this.favorites() || [], this.id)

    this.localStorageService.set('favorites', favorites)
  }
}
