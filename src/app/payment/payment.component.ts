import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { Router } from '@angular/router'
import { Order, Product } from '@app/data-types'
import { CartService } from '@app/services/cart.service'
import { OrderService } from '@app/services/order.service'
import { ProductsService } from '@app/services/products.service'
import { map, take } from 'rxjs/operators'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  orderTypes: string[] = ['Dine in', 'To Go', 'Delivery']
  selectedType: string = ''
  selectedMethodIndex = 0
  paymentDetails={
    CustomerName:'',
    CustomerMobile: null,
    paidAmount:{
      debit: 0,
      cash: 0
    }
  }
  wrongPaidAmount: boolean = false

  // cashAmount: number = 0

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onOrderTypeSelected(type: string) {
    this.selectedType = type
  }

  isFormValid() {
    if (this.selectedMethodIndex === 0) {
      // Credit Card Payment
      let cardholderName = (<HTMLInputElement>(
        document.getElementById('CardholderName')
      ))?.value
      let cardNumber = (<HTMLInputElement>document.getElementById('CardNumber'))
        ?.value
      let expirationDate = (<HTMLInputElement>(
        document.getElementById('ExpirationDate')
      ))?.value
      let cvv = (<HTMLInputElement>document.getElementById('CVV'))?.value

      return (
        cardholderName &&
        cardNumber &&
        expirationDate &&
        cvv &&
        this.selectedType
      )
    } else if (this.selectedMethodIndex === 1) {
      // Cash Payment
      let customerName = (<HTMLInputElement>(
        document.getElementById('CustomerName')
      ))?.value
      let customerMobile = (<HTMLInputElement>(
        document.getElementById('CustomerMobile')
      ))?.value

      return customerName && customerMobile && this.selectedType
    }

    return false
  }

  cancelPayment() {
    this.cartService.sendPaymentFlag(false)
  }

  // submit() {
  //   console.log('submit() method called')

  //   if (this.isFormValid()) {
  //     // let cartItems = this.cartService.getCartItems$()
  //     this.cartService.cartItems$.pipe(take(1)).subscribe((cart_items) => {
  //       console.log('cartItems$ observable emitted a value')

  //       let cartItems: Product[] = cart_items

  //       let customerMobileString = (<HTMLInputElement>(
  //         document.getElementById('CustomerMobile')
  //       ))?.value
  //       let tableNoString = (<HTMLInputElement>(
  //         document.getElementById('TableNo')
  //       ))?.value

  //       let productIds = cartItems.map((item) => item.id)

  //       let order: Order = {
  //         OrderType: this.selectedType,
  //         // ProductId: productIds,
  //         ProductName: '',
  //         ProductQuantity: '',
  //         ProductNotes: '',
  //         ProductPrice: '',
  //         TotalPrice: 0,
  //         OrderDate: new Date(),
  //         OrderStatus: 'Pending',
  //         CustomerName: (<HTMLInputElement>(
  //           document.getElementById('CustomerName')
  //         ))?.value,
  //         CustomerMobile: customerMobileString
  //           ? parseInt(customerMobileString)
  //           : undefined,
  //         TableNo: tableNoString ? parseInt(tableNoString) : undefined,
  //         Address: (<HTMLInputElement>document.getElementById('address'))
  //           ?.value,
  //       }

  //       // order.ProductId = cartItems.map((item) => item.id).join(', ')
  //       order.ProductName = cartItems.map((item) => item.ProductName).join(', ')
  //       // order.ProductQuantity = cartItems.reduce((total: any, item: Product) => total + item.ProductQuantity, 0)
  //       order.ProductQuantity = cartItems
  //         .map((item) => item.ProductQuantity)
  //         .join(', ')

  //       order.ProductNotes = cartItems
  //         .map((item) => item.ProductNotes)
  //         .join(', ')

  //       order.ProductPrice = cartItems
  //         .map((item) => item.ProductPrice)
  //         .join(', ')

  //       let totalPrice = cartItems.reduce(
  //         (total: any, item: Product) =>
  //           total + item.ProductPrice * item.ProductQuantity!,
  //         0,
  //       )

  //       if (this.selectedType === 'Delivery') {
  //         // Add delivery fees to the total price
  //         order.DeliveryFees = 40
  //         totalPrice += order.DeliveryFees
  //       } else if (this.selectedType === 'Dine in') {
  //         // Add service fees to the total price
  //         order.ServiceFees = 0.14

  //         totalPrice = totalPrice + totalPrice * order.ServiceFees
  //       }

  //       order.TotalPrice = totalPrice.toFixed(2)
  //       order.OrderStatus = 'Pending'

  //       if (this.selectedMethodIndex === 0) {
  //         let cardNumber = (<HTMLInputElement>(
  //           document.getElementById('CardNumber')
  //         )).value
  //         this.orderService.saveOrder(order).subscribe(() => {
  //           console.log('order: ', order)
  //           //Update the available quantity of products:
  //           console.log('cartItems: ', cartItems)
  //           cartItems.forEach(item =>{
  //             item.ProductAvailableQuantity -= item.ProductQuantity!
  //             this.productService.updateProduct(item).subscribe()
  //             // this.productService.getProduct(item.ProductId!).subscribe((product) =>{
  //             //   product.ProductAvailableQuantity -= item.ProductQuantity!
  //             //   this.productService.updateProduct(product).subscribe()
  //             // })
  //           })
  //           //Empty the cart and close the payment dialog
  //           this.cartService.clearCart()
  //           this.cartService.sendPaymentFlag(false)
  //           this.sendCartFlag(false)
  //         })
  //       } else if (this.selectedMethodIndex === 1) {
  //         this.orderService.saveOrder(order).subscribe(() => {
  //           console.log('order: ', order)
  //           //Update the available quantity of products:
  //           // cartItems.forEach((item) => {
  //           //   console.log('item: ', item)
  //           //   this.productService.getProduct(item.ProductId!).subscribe((product) => {
  //           //     console.log('product: ', product)
  //           //     product.ProductAvailableQuantity -= item.ProductQuantity!
  //           //     this.productService.updateProduct(product).subscribe()
  //           //   })
  //           // })

  //           this.cartService.clearCart()
  //           this.cartService.sendPaymentFlag(false)
  //           this.sendCartFlag(false)
  //         })
  //       }
  //     })
  //   }
  // }


  submit() {
    console.log('submit() method called')
  
    if (this.isFormValid()) {
      this.cartService.cartItems$.pipe(take(1)).subscribe((cartItems: Product[]) => {
        
        let customerName = (<HTMLInputElement>document.getElementById('CustomerName'))?.value
        let customerMobile = (<HTMLInputElement>document.getElementById('CustomerMobile'))?.value
        let deliveryAddress = (<HTMLInputElement>document.getElementById('address'))?.value
        let dineInTableNo = (<HTMLInputElement>document.getElementById('TableNo'))?.value
        // let customerMobileString = (<HTMLInputElement>(
        //   document.getElementById('CustomerMobile')
        // ))?.value
        // let tableNoString = (<HTMLInputElement>(
        //   document.getElementById('TableNo')
        // ))?.value
  
        // let productIds = cartItems.map((item) => item.id)
  
        let order: Order = {
          OrderType: this.selectedType,
          ProductName: cartItems.map((item) => item.ProductName).join(', '),
          ProductQuantity: cartItems.map((item) => item.ProductQuantity).join(', '),
          ProductNotes: cartItems.map((item) => item.ProductNotes).join(', '),
          ProductPrice: cartItems.map((item)=> item.ProductPrice).join(', '),
          TotalPrice: 0,
          OrderDate: new Date(),
          OrderStatus: 'Pending',
          CustomerName: customerName,
          CustomerMobile: customerMobile ? parseInt(customerMobile): undefined,
          TableNo: dineInTableNo ? parseInt(dineInTableNo): undefined,
          Address: this.selectedType === 'Delivery' ? deliveryAddress: undefined,
          DeliveryFees: this.selectedType === 'Delivery' ? 40 :  undefined,
          ServiceFees: this.selectedType === 'Dine in' ? 0.14: undefined
        }
        // let order: Order = {
        //   OrderType: this.selectedType,
        //   ProductName: cartItems.map((item) => item.ProductName).join(', '),
        //   ProductQuantity: cartItems.map((item) => item.ProductQuantity).join(', '),
        //   ProductNotes: cartItems.map((item) => item.ProductNotes).join(', '),
        //   ProductPrice: cartItems.map((item) => item.ProductPrice).join(', '),
        //   TotalPrice: 0,
        //   OrderDate: new Date(),
        //   OrderStatus: 'Pending',
        //   CustomerName: (<HTMLInputElement>(
        //     document.getElementById('CustomerName')
        //   ))?.value,
        //   CustomerMobile: customerMobileString
        //     ? parseInt(customerMobileString)
        //     : undefined,
        //   TableNo: tableNoString ? parseInt(tableNoString) : undefined,
        //   Address: (<HTMLInputElement>document.getElementById('address'))?.value,
        // }

        let totalPrice = 0
        cartItems.forEach((item) => {
          totalPrice += item.ProductPrice * (item.ProductQuantity ?? 0)
        })
  
        // let totalPrice = cartItems.reduce(
        //   (total: any, item: Product) =>
        //     total + item.ProductPrice * item.ProductQuantity!,
        //   0,
        // )

        if(this.selectedType === 'Delivery'){
          totalPrice += order.DeliveryFees ?? 0
        }else if(this.selectedType === 'Dine in'){
          totalPrice += totalPrice * (order.ServiceFees ?? 0)
        }

        order.TotalPrice = totalPrice
        console.log('totalPrice: ', order.TotalPrice)

        let cashPaid = parseFloat((<HTMLInputElement>document.getElementById('CashPaidAmount'))?.value)
        console.log('cashPaid: ', cashPaid)
        let debitPaid = parseFloat((<HTMLInputElement>document.getElementById('DebitPaidAmount'))?.value)
        console.log('debitPaid: ', debitPaid)

        console.log('+: ', cashPaid + debitPaid)
        if(cashPaid + debitPaid !== totalPrice){
          this.wrongPaidAmount = true
          console.log('not equal')
          return;
        }else{
          this.wrongPaidAmount = false
        }
  
        // if (this.selectedType === 'Delivery') {
        //   order.DeliveryFees = 40
        //   totalPrice += order.DeliveryFees
        // } else if (this.selectedType === 'Dine in') {
        //   order.ServiceFees = 0.14
        //   totalPrice = totalPrice + totalPrice * order.ServiceFees
        // }
  
        // order.TotalPrice = totalPrice.toFixed(2)
        // order.OrderStatus = 'Pending'

        //Submit order:

        this.orderService.saveOrder(order).subscribe((savedOrder) => {
          console.log('order: ', savedOrder)

          //update available quantity:
          cartItems.forEach((item) => {
            item.ProductAvailableQuantity -= item.ProductQuantity ?? 0
            this.productService.updateProduct(item).subscribe()
          })

          //Empty cart and close dialog:
          this.cartService.clearCart()
          this.cartService.sendPaymentFlag(false)
          this.sendCartFlag(false)
        })

        // if (this.selectedMethodIndex === 0) {
        //   let cardNumber = (<HTMLInputElement>(
        //     document.getElementById('CardNumber')
        //   )).value
  
        //   this.orderService.saveOrder(order).subscribe(() => {
        //     console.log('order: ', order)
        //     // Update the available quantity of products
        //     cartItems.forEach((item) => {
        //       item.ProductAvailableQuantity -= item.ProductQuantity!
        //       console.log('item: ', item)
        //       console.log('AQ', item.ProductAvailableQuantity)
        //       this.productService.updateProductII(item.ProductId!, item).subscribe()
        //     })
        //     // Empty the cart and close the payment dialog
        //     this.cartService.clearCart()
        //     this.cartService.sendPaymentFlag(false)
        //     this.sendCartFlag(false)
        //   })
        // } else if (this.selectedMethodIndex === 1) {
        //   this.orderService.saveOrder(order).subscribe(() => {
        //     console.log('order: ', order)
        //     // Update the available quantity of products
        //     cartItems.forEach((item) => {
        //       item.ProductAvailableQuantity -= item.ProductQuantity!
        //       this.productService.updateProductII(item.ProductId!, item).subscribe()
        //     })
        //     // Empty the cart and close the payment dialog
        //     this.cartService.clearCart()
        //     this.cartService.sendPaymentFlag(false)
        //     this.sendCartFlag(false)
        //   })
        // }
      })
    }
  }

  calculateCashAmount(){
    const cashPaid = parseFloat((<HTMLInputElement>document.getElementById('CashPaidAmount'))?.value)
    const debitPaid = parseFloat((<HTMLInputElement>document.getElementById('DebitPaidAmount'))?.value)
    // this.paymentDetails.paidAmount.cash = totalPrice - debitPaid
  }

  sendCartFlag(flag: boolean) {
    this.cartService.sendCartFlag(flag)
  }



  

}
