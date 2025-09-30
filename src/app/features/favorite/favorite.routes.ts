import { Route } from '@angular/router'

export const FAVORITE_ROUTES: Route[] = [
  {
    path: 'favorites',
    loadComponent: () =>
      import('@features/favorite/pages/favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      )
  }
]
