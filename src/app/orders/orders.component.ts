import { Component, OnInit } from '@angular/core';
import { Order } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';
import { OrderService } from '@app/services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []
  pendingOrders$ = new BehaviorSubject<Order[]>([])
  preparingOrders$ = new BehaviorSubject<Order[]>([])
  completedOrders$ = new BehaviorSubject<Order[]>([])
  employeeType: string = ''


  constructor(private orderService: OrderService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getOrders()
    this.getEmployeeType()
  }

  getOrders(){
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders
      this.pendingOrders$.next(orders.filter((order) => order.OrderStatus === 'Pending'))  
      this.preparingOrders$.next(orders.filter((order) => order.OrderStatus === 'Preparing')) 
      this.completedOrders$.next(orders.filter((order) => order.OrderStatus === 'Completed')) 
    })
  }

  prepareOrder(order: Order){
    let updatedOrder = {...order, OrderStatus: 'Preparing'}
    this.orderService.updateOrder(updatedOrder).subscribe(() => {
      let pendingOrders = this.pendingOrders$.value.filter((o) => o.id !== order.id)
      this.pendingOrders$.next(pendingOrders)
      this.preparingOrders$.next([...this.preparingOrders$.value, updatedOrder])
    })
 
  }

  completeOrder(order: Order){
    let updatedOrder = {...order, OrderStatus:'Completed'}
    this.orderService.updateOrder(updatedOrder).subscribe(() => {
      let preparingOrders = this.preparingOrders$.value.filter((o) => o.id !== order.id)
      this.preparingOrders$.next(preparingOrders)
      this.completedOrders$.next([...this.completedOrders$.value, updatedOrder])
    })
  }

  getEmployeeType(){
    this.employeeService.employeeType$.subscribe(type =>{
      // console.log('type:', type)
      this.employeeType = type!
    })
  }

}
