import { Component, computed, signal } from '@angular/core'
import { PhotoListComponent } from '@shared/components/photo-list/photo-list.component'
import { toSignal } from '@angular/core/rxjs-interop'
import { BehaviorSubject, throttleTime, switchMap, scan, finalize, of, delay } from 'rxjs'
import { ImageItem } from '@features/photo/interfaces/image.interface'

@Component({
  selector: 'app-photos',
  imports: [PhotoListComponent],
  template: ` <app-photo-list
    [imageRows]="imageRows()"
    [isLoading]="isLoading()"
    hasLoading
    (reachedEndChange)="reachedEndChange()"></app-photo-list>`
})
export class PhotosComponent {
  private page = signal(0)
  private pageSize = 20

  isLoading = signal(false)

  offset = new BehaviorSubject<void>(void 0)

  readonly imageRows = computed(() => {
    const images = this.items()

    return images.reduce<ImageItem[][]>((acc, _, i) => {
      if (i % 5 === 0) acc.push(images.slice(i, i + 5))
      return acc
    }, [])
  })

  private itemsSource$ = this.offset.pipe(
    throttleTime(200),
    switchMap(() => {
      const currentPage = this.page()

      this.isLoading.set(true)
      this.page.update((p) => p + 1)
      return this.fetchPage(currentPage)
    }),
    scan((acc, newItems) => [...acc, ...newItems], [] as ImageItem[]),
    finalize(() => this.isLoading.set(false))
  )

  items = toSignal(this.itemsSource$, { initialValue: [] })

  private fetchPage(page: number) {
    return of(
      Array.from({ length: this.pageSize }, (_, i) => ({
        id: page * this.pageSize + i,
        url: `https://picsum.photos/id/${page * this.pageSize + i}/300/300`
      }))
    ).pipe(delay(700))
  }

  reachedEndChange() {
    this.offset.next()
  }
}
