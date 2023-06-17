import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations'
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core'
import { SideNavToggle } from '@app/data-types'
import { navbarData } from '@app/nav-data'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity: 0}),
        animate('350ms', 
        style({opacity: 1}))
      ]),
      transition('* => void', [
        style({opacity: 1}),
        animate('350ms', 
        style({opacity: 0}))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('0.5s', keyframes([
          style({transform:'rotate(0deg)', offset: '0'}),
          style({transform:'rotate(360deg)', offset: '1'}),
        ]))
      ])
    ])
    
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter()
  collapsed = true
  screenWidth = 0
  navData = navbarData
  constructor() {}

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth
    if (this.screenWidth <= 768) {
      this.collapsed = false
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    })
  }

  closeSidenav() {
    this.collapsed = false
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    })
  }
}
