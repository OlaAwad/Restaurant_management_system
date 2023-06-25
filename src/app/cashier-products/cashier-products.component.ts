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
  

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts(){
    this.productsService.getProducts().subscribe((result) => {
      this.products = result
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
      this.cartService.getCartItems()    
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
}

