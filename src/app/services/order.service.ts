import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@app/data-types';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl
  orderData: Order[] = []

  constructor(private http: HttpClient) { }

  saveOrder(order: Order){
    return this.http.post(`${this.apiUrl}/Orders`, order)
  }
}
