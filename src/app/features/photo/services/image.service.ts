import { computed, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { BehaviorSubject, throttleTime, switchMap, scan, of, delay, finalize } from 'rxjs'
import { ImageItem } from '@features/photo/interfaces/image.interface'

@Injectable({ providedIn: 'root' })
export class ImageService {
  private page = signal(0)
  private pageSize = 20

  offset = new BehaviorSubject<void>(void 0)

  isLoading = signal(false)

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
        id: page * this.pageSize + i + 1,
        url: `https://picsum.photos/300/300?random=${page * this.pageSize + i + 1}`
      }))
    ).pipe(delay(700))
  }
}
