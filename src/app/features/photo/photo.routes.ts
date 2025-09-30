import { Route } from '@angular/router'

export const PHOTO_ROUTES: Route[] = [
  {
    path: 'photos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@features/photo/pages/photos/photos.component').then((c) => c.PhotosComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@app/features/photo/pages/photo/photo.component').then((c) => c.PhotoComponent)
      }
    ]
  }
]
