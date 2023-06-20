import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {SignUp, Login} from '../data-types'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.apiUrl
  isEmployeeLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)
  private employeeTypeSubject = new BehaviorSubject<string|null>(null)
  employeeType$ = this.employeeTypeSubject.asObservable()

  constructor(private http: HttpClient, private router: Router) {
    let employeeType = localStorage.getItem('EmployeeType')
    if(employeeType){
      this.employeeTypeSubject.next(employeeType)
    }
   }

   setEmployeeType(employeeType: string){
    localStorage.setItem('EmployeeType', employeeType)
    this.employeeTypeSubject.next(employeeType)
   }

  employeeSignUp(data: SignUp){
    return this.http.post<SignUp>(`${this.apiUrl}/Employees`, data)
  }

  reloadEmployee(){
    if(localStorage.getItem('employee')){
      this.isEmployeeLoggedIn.next(true)
      // this.router.navigate(['home'])
    }
  }

  employeeLogin(data: Login){
    this.http.get(`${this.apiUrl}/employees?Email=${data.Email}&Password=${data.Password}`, {observe:'response'}).subscribe((result: any) => {
      if(result && result.body && result.body.length){
        localStorage.setItem('employee', JSON.stringify(result.body))
        this.router.navigate(['categories']);
        // (window as any).ngRef.instance.onLoginSuccess()
      }else{
        console.log('Login Failed')
        this.isLoginError.emit(true)
      }
    })
  }


  employeeLogout(){
    localStorage.removeItem('employee')
    // this.router.navigate(['/employee-auth']);
    // (window as any).ngRef.instance.onLogout()
  }

  getEmployees(){
    return this.http.get<SignUp[]>(`${this.apiUrl}/Employees`)
  }

  getEmployee(employeeId: number){
    return this.http.get<SignUp>(`${this.apiUrl}/Employees/${employeeId}`)
  }

  updateEmployee(employee: SignUp){
    return this.http.put<SignUp>(`${this.apiUrl}/Employees/${employee.id}`, employee)
  }

  deleteEmployee(employeeId: number){
    return this.http.delete<SignUp>(`${this.apiUrl}/Employees/${employeeId}`)
  }

  searchEmployee(query: string){
    return this.http.get<SignUp[]>(`${this.apiUrl}/Employees?q=${query}`)
  }
}
