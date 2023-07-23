import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '@app/data-types';
import { BehaviorSubject, catchError, map, Observable, Subject, tap } from 'rxjs';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  apiUrl = environment.apiUrl

  // private productsSubject = new BehaviorSubject<Product[]>([])
  // products$: Observable<Product[]> = this.productsSubject.asObservable()


  private products: Product[] = []
  products$ = new BehaviorSubject<Product[]>([])

  private updatedProductSubject = new Subject<Product>()
  updatedProduct$ = this.updatedProductSubject.asObservable()

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

constructor(private http: HttpClient, private categoriesService: CategoriesService) {
  this.getProducts().subscribe((products) => {
    this.products = products
    this.products$.next(this.products)
  })
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
    return this.http.put<Product>(`${this.apiUrl}/Products/${product.ProductId}`, product).pipe(
      tap((updatedProduct) => {
        const updatedProducts = this.products.map((p) => {
          if(p.ProductId === updatedProduct.ProductId){
            return updatedProduct
          }
          return p
        })
        this.products = updatedProducts
        this.products$.next(this.products)
      })
    )
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

  updateProductII(id: number, product: Product){
    return this.http.put<Product>(`${this.apiUrl}/Products/${product.ProductId}`, product).pipe(
      map((updatedProduct) => {
        let index = this.products.findIndex((p) => p.id === updatedProduct.id)
        if(index !== -1){
          // this.products[index] = updatedProduct
          this.products$.next(this.products)
        }
        return updatedProduct
      })
    )
    // return this.http.put<Product>(`${this.apiUrl}/Products/${product.ProductId}`, product, this.httpOptions).pipe(
    //   tap((updatedProduct)=> this.updatedProductSubject.next(updatedProduct))
    // )
  }

  sendUpdatedProduct(product: Product){
    this.updatedProductSubject.next(product)
  }
 

}
