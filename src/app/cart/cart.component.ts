import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '@app/data-types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // cartItems: Product[] = []
  @Input() items: Product[] = []
  @Output() close = new EventEmitter<void>()
  orderType: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  getTotal(): number{
    return this.items.reduce((total, item) => total + item.ProductPrice, 0)
  }

  removeItem(index: number): void{
    this.items.splice(index, 1)
  }

  checkout(): void{
    this.close.emit()
  }

}
