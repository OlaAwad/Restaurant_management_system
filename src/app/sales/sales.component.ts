import { Component, OnInit } from '@angular/core';
import { Order, SalesData } from '@app/data-types';
import { OrderService } from '@app/services/order.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  orders: Order[] = []
  salesData: SalesData = {}
  products: any = {}
  salesDataKeys: string[] = []
  productsKeys: string[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders
      this.salesData = this.generateSalesData(orders)
      this.salesDataKeys = Object.keys(this.salesData)
      this.productsKeys = Object.keys(this.products)
    })
  }


  generateSalesData(orders: Order[]): SalesData{
    this.products = this.getProducts(orders)
    for(let order of this.orders){
      let orderDate = new Date(order.OrderDate!)
      let date = orderDate.toISOString().substring(0, 10)
      let products = order.ProductName.split(', ')
      let quantities = order.ProductQuantity.split(', ')
      let prices = order.ProductPrice.split(', ')

      for(let i = 0; i < products.length; i++){
        let product = products[i]
        let quantity = parseInt(quantities[i])
        let revenue = parseFloat(prices[i]) * quantity

        if(!this.salesData[date]){
          this.salesData[date] = {}
        }
        if(!this.salesData[date][product]){
          this.salesData[date][product] = {
            Quantity: 0,
            Revenue: 0
          }
        }
        this.salesData[date][product].Quantity += quantity
        this.salesData[date][product].Revenue += revenue
      }


    }

    return this.salesData

  }


  getProducts(orders: Order[]): { [key: string]: number}{
    let products: {[key: string]: number} = {}
    let productIndex = 0

    for(let order of orders){
      let productNames = order.ProductName.split(', ')
      for(let productName of productNames){
        if(!(productName in products)){
          products[productName] = productIndex
          productIndex ++
        }
      }
    }
    return products
  }

  getTotalRevenueForDate(date: string): number{
    let totalRevenue = 0
    for(let product of this.productsKeys){
      if(this.salesData[date][product]){
        totalRevenue += this.salesData[date][product].Revenue || 0
      }
    }
    return totalRevenue
  }

  toggleCollapse(date: string){
    for(let product of this.productsKeys){
      let row = document.getElementById(date + '-' + product)
      if(row?.classList.contains('show')){
        row.classList.remove('show')
      } else{
        row?.classList.add('show')
      }
    }
  }
}
