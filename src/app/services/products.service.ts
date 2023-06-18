import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Product } from '@app/data-types';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = environment.apiUrl

constructor(private http: HttpClient) { }

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


}
