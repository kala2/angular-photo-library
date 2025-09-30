import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport
} from '@angular/cdk/scrolling'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output
} from '@angular/core'
import { ImageItem } from '@features/photo/interfaces/image.interface'
import { LocalStorageService } from '@app/shared/services/local-storage.service'
import { PhotoCardComponent } from '@app/features/photo/components/photo-card/photo-card.component'
import { LoadingComponent } from '@app/shared/components/loading/loading.component'

@Component({
  selector: 'app-photo-list',
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    LoadingComponent,
    PhotoCardComponent
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent {
  localStorageService = inject(LocalStorageService)

  readonly hasLoading = input<boolean, boolean | string>(false, {
    transform: booleanAttribute
  })

  imageRows = input.required<ImageItem[][]>()

  isLoading = input(false)

  reachedEndChange = output()

  onScrolledIndexChange(index: number) {
    const totalRows = this.imageRows().length
    const scrollThreshold = Math.max(1, totalRows - 2)

    if (index >= scrollThreshold) {
      this.reachedEndChange.emit()
    }
  }

  trackByRowIndex(index: number, row: ImageItem[]) {
    return row.length > 0 ? row[0].id : index
  }
}
