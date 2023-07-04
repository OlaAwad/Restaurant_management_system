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
  dates: string[] = []
  products: string[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders
      this.salesData = this.generateSalesData(orders)
      this.dates = Object.keys(this.salesData).sort().reverse()
      this.products = this.getProducts(orders)
    })
  }


  generateSalesData(orders: Order[]): SalesData{
    for(let order of this.orders){
      let date = order.OrderDate.toISOString().substring(0, 10)
      let product = order.ProductName
      let quantity = parseInt(order.ProductQuantity)
      let revenue = order.TotalPrice

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

    return this.salesData

  }

  getProducts(orders: Order[]): string[]{
    let products = new Set<string>()

    for(let order of orders){
      products.add(order.ProductName)
    }
    return Array.from(products).sort()
  }

}
