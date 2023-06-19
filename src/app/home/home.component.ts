import { Component, OnInit} from '@angular/core';
import { SideNavToggle } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // isSideNavCollapsed = false
  // screenWidth = 0
  // onToggleSideNav(data: SideNavToggle){
  //   this.screenWidth = data.ScreenWidth
  //   this.isSideNavCollapsed = data.Collapsed
  // }

  constructor(private employeeService: EmployeeService){}
  ngOnInit(){
    // this.employeeService.reloadEmployee()
  }

 

}
