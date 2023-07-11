import { Component, OnInit } from '@angular/core';
import { Order } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';
import { OrderService } from '@app/services/order.service';
import { BehaviorSubject, map } from 'rxjs';

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
  isChef: boolean = false


  constructor(private orderService: OrderService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getOrders()
    this.getEmployeeType()
  }

  getOrders(){
    let currentTime = new Date().getTime()
    let lastHourTime = currentTime - (60 * 60 * 1000)

    this.orderService.getOrders().pipe(
      map((orders: Order[]) => orders.filter((order) => {
        let orderTime = new Date(order.OrderDate).getTime()
        return orderTime >= lastHourTime
      }))
    ).subscribe((filteredOrders: Order[]) => {
      this.orders = filteredOrders
      this.pendingOrders$.next(this.orders.filter((order) => order.OrderStatus === 'Pending'))  
        this.preparingOrders$.next(this.orders.filter((order) => order.OrderStatus === 'Preparing')) 
        this.completedOrders$.next(this.orders.filter((order) => order.OrderStatus === 'Completed')) 
    })
    
    // this.orderService.getOrders().subscribe((orders: Order[]) => {
    //   this.pendingOrders$.next(orders.filter((order) => order.OrderStatus === 'Pending'))  
    //   this.preparingOrders$.next(orders.filter((order) => order.OrderStatus === 'Preparing')) 
    //   this.completedOrders$.next(orders.filter((order) => order.OrderStatus === 'Completed')) 
    // })
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
      console.log('type:', type)
      this.employeeType = type!
      this.checkIfChef()
    })
  }

  checkIfChef(){
    if(this.employeeType == 'Chef'){
      this.isChef = true
    } else{
      this.isChef = false
    }
  }

  

}
