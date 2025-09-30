import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport
} from '@angular/cdk/scrolling'
import { Component, inject, ViewChild } from '@angular/core'
import { ImageItem } from '@features/photo/interfaces/image.interface'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { appendOrDelete } from '@app/shared/utils/utils'
import { ImageService } from '@features/photo/services/image.service'
import { PhotoComponent } from '@features/photo/components/photo/photo.component'
import { LoadingComponent } from '@app/shared/components/loading/loading.component'

@Component({
  selector: 'app-photo-list',
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    LoadingComponent,
    PhotoComponent
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent {
  @ViewChild('viewport', { static: true }) viewport!: CdkVirtualScrollViewport

  localStorageService = inject(LocalStorageService)
  imageService = inject(ImageService)

  favorites = this.localStorageService.signal('favorites')

  imageRows = this.imageService.imageRows
  offset = this.imageService.offset
  isLoading = this.imageService.isLoading

  onScrolledIndexChange(index: number) {
    const totalRows = this.imageRows().length
    const scrollThreshold = Math.max(1, totalRows - 2)

    if (index >= scrollThreshold) {
      this.offset.next()
    }
  }

  trackByRowIndex(index: number, row: ImageItem[]) {
    return row.length > 0 ? row[0].id : index
  }

  onFavoriteClick(url: string) {
    const favorites = appendOrDelete(this.favorites() || [], url)

    this.localStorageService.set('favorites', favorites)
  }
}
