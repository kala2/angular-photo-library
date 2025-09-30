import { Route } from '@angular/router'

export const PHOTO_ROUTES: Route[] = [
  {
    path: 'photos',
    loadComponent: () =>
      import('@features/photo/pages/photos/photos.component').then((c) => c.PhotosComponent)
  },
  {
    path: 'photo',
    loadComponent: () =>
      import('@features/photo/pages/photo/photo.component').then((c) => c.PhotoComponent)
  }
]
