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
import { EmployeeService } from '@app/services/employee.service'

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
  Collapsed = true
  ScreenWidth = 0
  navData = navbarData
  constructor(private employeeService: EmployeeService) {}

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.ScreenWidth = window.innerWidth
    if (this.ScreenWidth <= 768) {
      this.Collapsed = false
      this.onToggleSideNav.emit({
        Collapsed: this.Collapsed,
        ScreenWidth: this.ScreenWidth,
      })
    }
  }

  ngOnInit(): void {
    this.ScreenWidth = window.innerWidth
    this.getEmployeeType()
  }

  toggleCollapse() {
    this.Collapsed = !this.Collapsed
    this.onToggleSideNav.emit({
      Collapsed: this.Collapsed,
      ScreenWidth: this.ScreenWidth,
    })
  }

  closeSidenav() {
    this.Collapsed = false
    this.onToggleSideNav.emit({
      Collapsed: this.Collapsed,
      ScreenWidth: this.ScreenWidth,
    })
  }

  getEmployeeType(){
    let type = this.employeeService.getEmployeeType()
    console.log('type: ', type)
  }
}
