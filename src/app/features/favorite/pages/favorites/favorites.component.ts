import { Component, computed, inject, WritableSignal } from '@angular/core'
import { ImageItem } from '@app/features/photo/interfaces/image.interface'
import { ImageService } from '@app/features/photo/services/image.service'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { LocalStorageService } from '@shared/services/local-storage.service'

@Component({
  selector: 'app-favorites',
  imports: [PhotoListComponent],
  template: `<app-photo-list [imageRows]="imageRows()"></app-photo-list>`
})
export class FavoritesComponent {
  imageService = inject(ImageService)
  localStorageService = inject(LocalStorageService)

  favorites: WritableSignal<ImageItem[]> = this.localStorageService.signal('favorites')

  readonly imageRows = computed(() => {
    const images = this.favorites() || []

    return images.reduce<ImageItem[][]>((acc, _, i) => {
      if (i % 5 === 0) acc.push(images.slice(i, i + 5))
      return acc
    }, [])
  })
}
