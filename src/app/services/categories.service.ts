import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from '@app/data-types';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = environment.apiUrl
constructor(private http: HttpClient) { }

  addCategory(data: Category){
    return this.http.post<Category>(`${this.apiUrl}/Categories`, data)
  }

  getCategory(categoryId: number){
    return this.http.get<Category>(`${this.apiUrl}/Categories/${categoryId}`)
  }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/Categories`)
  }  

  updateCategory(category: Category){
    console.log('catId: ', category.id)
    return this.http.put<Category>(`${this.apiUrl}/Categories/${category.id}`, category)
  }


  deleteCategory(categoryId: number){
    return this.http.delete<Category>(`${this.apiUrl}/Categories/${categoryId}`)
  }


  searchCategories(query: string){
    return this.http.get<Category[]>(`${this.apiUrl}/Categories?q=${query}`)
  }

  getCatNameById(categoryId: number): Observable<string>{
    let url = `${this.apiUrl}/Categories/${categoryId}`
    return this.http.get<Category>(url).pipe(map((category: Category) => category.CategoryName))
  }



}
