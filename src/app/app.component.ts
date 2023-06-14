import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'posRestaurant';

  constructor(private employeeService: EmployeeService){}
  ngOnInit(){
    this.employeeService.reloadEmployee()
  }
}
