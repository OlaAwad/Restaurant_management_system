import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations'
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core'
import { Router } from '@angular/router'
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
  employeeType: string = ''
  filteredNavData: any[] =[]

  constructor(private employeeService: EmployeeService, private router: Router) {}

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
    this.Collapsed = false
    this.ScreenWidth = window.innerWidth
    this.employeeService.employeeType$.subscribe((type) =>{
      console.log('type: ', type)
      this.employeeType = type!
      this.filteredNavData = this.navData.filter((data) => {
        return data.employeeType.includes(type!)
      })
    })

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

  onNavItemClick(data: any){
    if(data.label === 'Logout'){
      this.employeeService.employeeLogout()
      // console.log('logout')
    }
  }

  employeeTypeExists(){
    let employee = localStorage.getItem('employee')
    if(employee){
      return true
    } else{
      return false
    }
  }

}
