import { Component, OnInit, ViewChild } from '@angular/core';
import { Category, Product } from '@app/data-types';
import { ProductsService } from '@app/services/products.service';
import { CategoriesService } from '@app/services/categories.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartComponent } from '@app/cart/cart.component';
import { CartService } from '@app/services/cart.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-cashier-products',
  templateUrl: './cashier-products.component.html',
  styleUrls: ['./cashier-products.component.css'],
  animations:[
    trigger('slideInFromLeft', [
      state('hidden', style({transform: 'translateX(-100%)'})),
      state('visible', style({transform: 'translateX(0%)'})),
      transition('hidden <=> visible', animate('500ms ease-in-out'))
    ])

    // trigger('slideInFromLeft', [
    //   transition(':enter', [
    //     style({transform: 'translateX(-100%)'}),
    //     animate('500ms ease-in-out', style({transform:'translateX(0%)'}))
    //   ]),
    //   transition(':leave', [
    //     animate('500ms ease-in-out', style({ transform: 'translateX(-100%)'}))
    //   ])
    // ])
  ]
})
export class CashierProductsComponent implements OnInit {

  products: Product[] = []
  categories: Category[] = []
  cartItems: Product[] = []
  isCartVisible: boolean = false
  cartTotal: number = 0
  canAdd: boolean = true
  showPayment: boolean = false

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
    this.receivePaymentFlag()
    this.getCartFlag()
    // this.getPrdAvailableQuantity()
  }

  getProducts(){
    this.productsService.getProducts().subscribe((products) => {
      this.products = products
    })
    
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe((result) => {
      this.categories = result
    })
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      let element = query.target as HTMLInputElement
      this.productsService.searchProducts(element.value).subscribe((result) => {
        this.products = result
      })
    }
  }

 

  addToCart(product: Product){
    this.isCartVisible = true
      this.cartService.addItemToCart(product)    
      // this.cartService.getCartItems$()  
      this.cartService.cartItems$.subscribe(cartItems =>{
        this.cartItems = cartItems
      })
      // if((product.ProductQuantity)! >= product.ProductAvailableQuantity){
      //   product.canAdd = false
      // }  else{
      //   product.canAdd = true
      // }
      
      // this.cartService.cartItems$.subscribe(cartItems =>{
      //   this.cartItems = cartItems
      //   console.log('cartItems: ', this.cartItems)
      //   for(let item of this.cartItems){
      //     if((item.ProductQuantity)! <  item.ProductAvailableQuantity){
      //       item.canAdd = true
      //       console.log(item.canAdd)
      //     } else{
      //       item.canAdd = false
      //       console.log(item.canAdd)
      //     }
      //   }
      // })
      this.calculateTotal()

  }
  
  
  

  calculateTotal(){
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.ProductPrice * item.ProductQuantity! || 0)
    }, 0)
  }
 
  closeCart(){
    this.isCartVisible = false
    
  }


  receivePaymentFlag(){
    this.cartService.payment$.subscribe(flag => {
      // console.log(flag)
      this.showPayment = flag
    })
  }

  getCartFlag(){
    this.cartService.isCartVisible$.subscribe((response)=>{
      this.isCartVisible = response
    })
  }

  // getPrdAvailableQuantity(){
  //   this.productsService.ProductAvailableQuantity$.subscribe()
  // }

}

