import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Product } from '@app/data-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriesService } from './categories.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = environment.apiUrl

  private productsSubject = new BehaviorSubject<Product[]>([])
  products$: Observable<Product[]> = this.productsSubject.asObservable()

constructor(private http: HttpClient, private categoriesService: CategoriesService) {
 }

  addProduct(data: Product){
    return this.http.post<Product>(`${this.apiUrl}/Products`, data)
  }

  getProduct(productId: number){
    return this.http.get<Product>(`${this.apiUrl}/Products/${productId}`)
  }
  
 

  getProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}/Products`)
  }

  updateProduct(product: Product){
    return this.http.put<Product>(`${this.apiUrl}/Products/${product.id}`, product)
  }

  deleteProduct(productId: number){
    return this.http.delete<Product>(`${this.apiUrl}/Products/${productId}`)
  }

  searchProducts(query: string){
    return this.http.get<Product[]>(`${this.apiUrl}/Products?q=${query}`)
  }

  getProductsByCategory(categoryName: string):Observable<Product[]>{
    let url = `${this.apiUrl}/Products?ProductCategory=${categoryName}`
    return this.http.get<Product[]>(url)
  }

 

}
