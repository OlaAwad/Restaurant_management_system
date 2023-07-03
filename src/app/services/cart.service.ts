import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/data-types';
import { BehaviorSubject, catchError, delay, Observable, of, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl
  cartItems: Product[] = []

  private cartItemsSubject = new BehaviorSubject<Product[]>([])
  cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable()

  private paymentSubject = new BehaviorSubject<boolean>(false)
  payment$: Observable<boolean> = this.paymentSubject.asObservable()
  
  private isCartVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isCartVisible$: Observable<boolean> = this.isCartVisibleSubject.asObservable()

  constructor(private http: HttpClient) {
    this.getCartItems$().subscribe(cartItems => {
      this.cartItemsSubject.next(cartItems)
    })
   }

 
  addItemToCart(product:Product){
    // let productQuantity = product.ProductQuantity || 1
    // if ((productQuantity)! >= product.ProductAvailableQuantity) {
      // Show an error message or disable the "Add to Cart" button
    //   console.log('error')
    //   return;
    // }
   
   this.getCartItems$().subscribe(cartItems => {
    let existingItem = cartItems.find(item => item.ProductName === product.ProductName)
    if(existingItem){
      if((existingItem.ProductQuantity || 0) >= existingItem.ProductAvailableQuantity){
        console.log('error')
        return
      }
      existingItem.ProductQuantity = (existingItem.ProductQuantity || 0) +1
      // (existingItem.ProductQuantity)!++
      this.http.put(`${this.apiUrl}/Cart/${existingItem.id}`, existingItem).subscribe(()=>{
        this.getCartItems$().subscribe(updatedCartItems => {
          this.cartItemsSubject.next(updatedCartItems)
        })
      })
    } else{
      let newItem = {...product,ProductId: product.id, ProductQuantity: 1, id: parseInt(uuidv4(), 16)}
      this.http.post(`${this.apiUrl}/Cart`, newItem).subscribe(()=>{
        this.getCartItems$().subscribe(updatedCartItems => {
          this.cartItemsSubject.next(updatedCartItems)
        })
      })
    }
   })
    
  }


  // getCartItems(): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${this.apiUrl}/Cart`)
    
  // }

  getCartItems$(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/Cart`)
  }

  deleteCartItem(index: number){
    return this.http.delete<Product>(`${this.apiUrl}/Cart/${index}`)
  }

 
  updateCartItems(cartItems: Product[]){
    // this.cartItems = cartItems
    this.cartItemsSubject.next(cartItems)
  }

  updateCartItem(item: Product){
    this.http.put(`${this.apiUrl}/Cart/${item.id}`, item).subscribe(() => {
      this.getCartItems$().subscribe(updatedCartItems =>{
        this.cartItemsSubject.next(updatedCartItems)
      })
    })
  }

  clearCart(){
    this.getCartItems$().subscribe(cartItems => {
      cartItems.forEach(item => {
        this.http.delete(`${this.apiUrl}/Cart/${item.id}`).subscribe(() => {
          this.cartItemsSubject.next([])
        })
      })
    })
    // this.http.delete(`${this.apiUrl}/Cart`).subscribe(() => {
    //   this.cartItemsSubject.next([])
    //   console.log(this.cartItemsSubject)
    // })
  }

  sendPaymentFlag(flag: boolean){
    this.paymentSubject.next(flag)
  }

  sendCartFlag(flag: boolean){
    this.isCartVisibleSubject.next(flag)
  }
}
