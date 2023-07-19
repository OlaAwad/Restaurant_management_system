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
  cartItems: any
  selectedMethodIndex = 0
  // paymentDetails={
  //   CustomerName:'',
  //   CustomerMobile: null,
  //   deliveryAddress: '',
  //   dineInTableNo:'',
  //   paidAmount:{
  //     debit: 0,
  //     cash: 0
  //   }
  // }

  paymentDetails: {
    CustomerName: string;
    CustomerMobile: number | null;
    deliveryAddress: string;
    dineInTableNo: string;
    paidAmount: {
      [key: string]: number;
      debit: number;
      cash: number;
    }
  } = {
    CustomerName: '',
    CustomerMobile: null,
    deliveryAddress: '',
    dineInTableNo: '',
    paidAmount: {
      debit: 0,
      cash: 0
    }
  }

  totalPrice: number = 0
  // paymentMethod: string = ''
  paymentMethod = {
    cash: false,
    debit: false
  }
  totalPaid: number = 0
  wrongPaidAmount: boolean = false

  // cashAmount: number = 0

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems: any) => {
      this.cartItems = cartItems
      this.calculateTotalPrice()
    })
  }

  calculateTotalPrice(){
    let totalPrice = 0
    this.cartItems.forEach((item: any) => {
      totalPrice += item.ProductPrice * (item.ProductQuantity ?? 0)
    })
    if(this.selectedType === 'Delivery'){
      totalPrice += 40
    } else if(this.selectedType === 'Dine in'){
      totalPrice += totalPrice*0.14
    }
    this.totalPrice = totalPrice
  }

  onOrderTypeSelected(type: string) {
    this.selectedType = type
    this.calculateTotalPrice()
  }

  isFormValid() {
    this.paymentDetails.deliveryAddress = (<HTMLInputElement>(document.getElementById('address')))?.value
    // console.log('address', this.paymentDetails.deliveryAddress)
    this.paymentDetails.dineInTableNo = (<HTMLInputElement>(document.getElementById('TableNo')))?.value
    if(!this.paymentDetails.CustomerName ||
      !this.paymentDetails.CustomerMobile || 
      (this.selectedType === 'Delivery' && !this.paymentDetails.deliveryAddress) || 
      (this.selectedType === 'Dine in' && !this.paymentDetails.dineInTableNo) ||
      this.wrongPaidAmount
      ){
        return false
      }
      return true
  }

  cancelPayment() {
    this.cartService.sendPaymentFlag(false)
  }
  
  submit() {
    console.log('submit() method called')
  
    if (this.isFormValid()) {
      this.cartService.cartItems$.pipe(take(1)).subscribe((cartItems: Product[]) => {
        
        let customerName = this.paymentDetails.CustomerName
        let customerMobile = this.paymentDetails.CustomerMobile
        const deliveryAddress = this.selectedType === 'Delivery' ? this.paymentDetails.deliveryAddress : undefined
        const dineInTableNo = this.selectedType === 'Dine in' ? this.paymentDetails.dineInTableNo: undefined
  
        const order: Order = {
          OrderType: this.selectedType,
          ProductName: cartItems.map((item) => item.ProductName).join(', '),
          ProductQuantity: cartItems.map((item) => item.ProductQuantity).join(', '),
          ProductNotes: cartItems.map((item) => item.ProductNotes).join(', '),
          ProductPrice: cartItems.map((item)=> item.ProductPrice).join(', '),
          TotalPrice: this.totalPrice,
          OrderDate: new Date(),
          OrderStatus: 'Pending',
          CustomerName: customerName,
          CustomerMobile: customerMobile ? customerMobile: undefined,
          TableNo: dineInTableNo ? parseInt(dineInTableNo): undefined,
          Address: deliveryAddress,
          DeliveryFees: this.selectedType === 'Delivery' ? 40 :  undefined,
          ServiceFees: this.selectedType === 'Dine in' ? 0.14: undefined
        }

        //Submit order:
        this.orderService.saveOrder(order).subscribe((savedOrder) => {
          console.log('order: ', savedOrder)

          //update available quantity:
          // cartItems.forEach((item) => {
          //   item.ProductAvailableQuantity -= item.ProductQuantity ?? 0
          //   this.productService.updateProduct(item).subscribe()
          // })

          //Empty cart and close dialog:
          this.cartService.clearCart()
          this.cartService.sendPaymentFlag(false)
          this.sendCartFlag(false)
        })

      })
    }
  }

  // calculateCashPaidAmount(){
  //   const debitPaid = parseFloat(String(this.paymentDetails.paidAmount.debit || 0))
  //   const cashPaid = this.totalPrice - debitPaid
  //   this.paymentDetails.paidAmount.cash = Number(cashPaid.toFixed(2))

  // }


  calculatePaidAmount(){
    const cashPaid = parseFloat(String(this.paymentDetails.paidAmount.cash || 0))
    const debitPaid = parseFloat(String(this.paymentDetails.paidAmount.debit || 0))
    const totalPaid = cashPaid + debitPaid
    this.totalPaid = totalPaid
    if(this.totalPaid !== this.totalPrice){
      this.wrongPaidAmount = true
    }else{
      this.wrongPaidAmount = false
    }
    this.paymentDetails.paidAmount['total'] = Number(totalPaid.toFixed(2))
  }

  sendCartFlag(flag: boolean) {
    this.cartService.sendCartFlag(flag)
  }
}
