import { Component } from '@angular/core';
import { SideNavToggle } from './data-types';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'posRestaurant';

  isSideNavCollapsed = false
  screenWidth = 0
  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.screenWidth
    this.isSideNavCollapsed = data.collapsed
  }

  constructor(private employeeService: EmployeeService){}
  ngOnInit(){
    this.employeeService.reloadEmployee()
  }
}
