import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-sidenav-body',
  templateUrl: './sidenav-body.component.html',
  styleUrls: ['./sidenav-body.component.css']
})
export class SidenavBodyComponent implements OnInit, OnDestroy {

  @Input() collapsed = false
  @Input() screenWidth = 0

  // isDestroyed = false
  // subscriptions: Subscription[] = []

  getBodyClass(): string{
    let styleClass = ''
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed'
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.isDestroyed = true
    // this.subscriptions.forEach((subscription) => {
    //   subscription.unsubscribe()
    // })
  }

}
