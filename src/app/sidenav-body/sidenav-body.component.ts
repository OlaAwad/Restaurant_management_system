import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-body',
  templateUrl: './sidenav-body.component.html',
  styleUrls: ['./sidenav-body.component.css']
})
export class SidenavBodyComponent implements OnInit {

  @Input() collapsed = false
  @Input() screenWidth = 0

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

}
