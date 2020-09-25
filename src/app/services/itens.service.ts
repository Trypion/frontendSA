import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItensService {
  constructor(private http: HttpClient) {}

  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:8080/Spice/api/item');
  }

  reverseGeocode(gps): Observable<any> {
    const gpsLatLong = gps.split(',');
    return this.http.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'json',
        lat: gpsLatLong[0],
        lon: gpsLatLong[1].trim(),
      },
    });
  }
}

// getRecipe(id: string): Observable<Recipe> {
//   return this.authService.getUser().pipe(
//     take(1),
//     exhaustMap((user: User) => {
//       return this.http
//         .get<Recipe>(
//           `https://recipe-book-9913d.firebaseio.com/users/${user.uid}/recipes/${id}.json`
//         )
//         .pipe(
//           map((recipe) => {
//             return {
//               ...recipe,
//               ingredients: recipe.ingredients ? recipe.ingredients : [],
//               id: id,
//             };
//           })
//         );
//     })
//   );
// }

// addRecipe(recipe: Recipe): void {
//   this.authService
//     .getUser()
//     .pipe(
//       take(1),
//       exhaustMap((user: User) => {
//         return this.http.post(
//           `https://recipe-book-9913d.firebaseio.com/users/${user.uid}/recipes.json`,
//           recipe
//         );
//       })
//     )
//     .subscribe((recipe) => {
//       this.recipesChanged.next();
//     });
// }

// updateRecipe(id: string, recipe: Recipe): void {
//   this.authService
//     .getUser()
//     .pipe(
//       take(1),
//       exhaustMap((user: User) => {
//         return this.http.patch(
//           `https://recipe-book-9913d.firebaseio.com/users/${user.uid}/recipes/${id}.json`,
//           recipe
//         );
//       })
//     )
//     .subscribe((recipe) => {
//       this.recipesChanged.next();
//     });
// }

// deleteRecipe(id: string): void {
//   this.authService
//     .getUser()
//     .pipe(
//       take(1),
//       exhaustMap((user: User) => {
//         return this.http.delete(
//           `https://recipe-book-9913d.firebaseio.com/users/${user.uid}/recipes/${id}.json`
//         );
//       })
//     )
//     .subscribe((recipe) => {
//       this.recipesChanged.next();
//     });
// }
