import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Login, SignUp } from '../data-types'
@Component({
  selector: 'app-employee-auth',
  templateUrl: './employee-auth.component.html',
  styleUrls: ['./employee-auth.component.css']
})
export class EmployeeAuthComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  showLogin: boolean = true
  authError: string = ''

  ngOnInit(): void {
    this.employeeService.reloadEmployee()
  }

  signUp(data: SignUp){
    this.employeeService.employeeSignUp(data)
  }

  login(data: Login){
    this.authError = ''
    this.employeeService.employeeLogin(data)
    this.employeeService.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = 'Email or Password is incorrect'
      }
    })
  }
  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }

}
