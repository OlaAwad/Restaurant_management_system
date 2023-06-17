import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {SignUp, Login} from '../data-types'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  isEmployeeLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  employeeSignUp(data: SignUp){
    let result = this.http.post('http://localhost:3000/employees', data, {observe:'response'}).subscribe((result) => {
      this.isEmployeeLoggedIn.next(true)
      localStorage.setItem('employee', JSON.stringify(result.body))
      this.router.navigate(['home'])
      console.log('result: ', result)
    })
  }

  reloadEmployee(){
    if(localStorage.getItem('employee')){
      this.isEmployeeLoggedIn.next(true)
      this.router.navigate(['home'])
    }
  }

  employeeLogin(data: Login){
    this.http.get(`http://localhost:3000/employees?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result: any) => {
      if(result && result.body && result.body.length){
        localStorage.setItem('employee', JSON.stringify(result.body))
        this.router.navigate(['home'])
      }else{
        console.log('Login Failed')
        this.isLoginError.emit(true)
      }
    })
  }
}
