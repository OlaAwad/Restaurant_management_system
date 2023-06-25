import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { SideNavToggle } from './data-types';
import { EmployeeAuthComponent } from './employee-auth/employee-auth.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'posRestaurant';

  isEmployeeAuth = false
  isEntryPoint = false

  // showSidenav = false
  showSidenav$ = new BehaviorSubject<boolean>(false)
  showSN$ = new BehaviorSubject<boolean>(false)

  isSideNavCollapsed = false
  screenWidth = 0
  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.ScreenWidth
    this.isSideNavCollapsed = data.Collapsed
  }

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    // this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd){
    //     let currentRoute = this.activatedRoute
    //     while(currentRoute.firstChild){
    //       currentRoute.firstChild
    //     }
    //     this.isEmployeeAuth = currentRoute.snapshot.component === EmployeeAuthComponent
    //     this.isEntryPoint = currentRoute.snapshot.component === EntryPointComponent
    //   }
    // })


    // this.router.events.subscribe((event) => {
    //   if(this.router.url.includes('/employee-auth')){
    //     this.isEmployeeAuth = true
    //   } else{
    //     this.isEmployeeAuth = false
    //   }

    //   if(this.router.url.includes('/authentication')){
    //     this.isEntryPoint = true
    //   } else{
    //     this.isEntryPoint = false
    //   }
    // })

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        // this.showSidenav = true
        let currentRoute = this.router.routerState.snapshot.root.firstChild
        if(currentRoute && currentRoute.data){
          // this.showSidenav = currentRoute.data['showSidenav'] ?? false
          this.showSidenav$.next(currentRoute.data['showSidenav'] ?? false)
        }
      }
      // this.showSideN()
    })

    this.employeeService.reloadEmployee()
  }

  onLoginSuccess(){
    this.showSidenav$.next(true)
  }

  onLogout(){
    this.showSidenav$.next(false)
  }

  

  // showSideN(){
  //   let emp = localStorage.getItem('employee')
  //   console.log('emp: ', emp)
  //   if(emp == null){
  //     this.showSN$.next(false)
  //   } else{
  //     this.showSN$.next(true)
  //   }
  // }
}
