import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem, Product } from '@app/data-types';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = []
  // @Input() items: Product[] = []
  @Output() close = new EventEmitter<void>()
  orderType: string = ''
  cartTotal: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems$()
    this.cartService.cartItems$.subscribe(cartItems =>{
      this.cartItems = cartItems
      this.calculateTotal()
    })
   
  }

  calculateTotal(){
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.ProductPrice * item.ProductQuantity! || 0)
    }, 0)
  }



  removeItem(item: Product){
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item)
    this.cartService.deleteCartItem(item.id).subscribe()
    this.cartService.updateCartItems(this.cartItems)
    this.calculateTotal()
  }

  checkout(): void{
    this.close.emit()
  }

  clearCart(){
    this.cartItems = []
    // this.cartService.updateCartItems([])
    this.cartService.clearCart()
    this.cartTotal = 0
  }

  updateCartItem(item: Product){
    this.cartService.updateCartItem(item)
    this.calculateTotal()
  }

  onQuantityChange(item:Product){
    if((item.ProductQuantity)! > item.ProductAvailableQuantity){
      item.ProductQuantity = item.ProductAvailableQuantity
    } 
  }

 

  sendPaymentFlag(flag: boolean){
    this.cartService.sendPaymentFlag(flag)
  }

  continueToPayment(){
    this.sendPaymentFlag(true)
  }

}
