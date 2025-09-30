import { Component, computed, inject } from '@angular/core'
import { ImageItem } from '@app/features/photo/interfaces/image.interface'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { LocalStorageService } from '@shared/services/local-storage.service'

@Component({
  selector: 'app-favorites',
  imports: [PhotoListComponent],
  template: `<app-photo-list [imageRows]="imageRows()"></app-photo-list>`
})
export class FavoritesComponent {
  localStorageService = inject(LocalStorageService)

  favorites = this.localStorageService.signal<number[]>('favorites')

  images = computed(() =>
    (this.favorites() || []).map((id) => ({
      id,
      url: `https://picsum.photos/id/${id}/300/300`
    }))
  )

  readonly imageRows = computed(() =>
    this.images().reduce<ImageItem[][]>((acc, _, i) => {
      if (i % 5 === 0) acc.push(this.images().slice(i, i + 5))
      return acc
    }, [])
  )
}
