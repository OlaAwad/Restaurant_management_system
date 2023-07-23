import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private employeeService: EmployeeService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const requiredEmployeeTypes = route.data['employeeType'].split(',')

      const currentUser = this.employeeService.getCurrentUser()

      console.log('requiredEmployeeTypes: ', requiredEmployeeTypes)
      console.log('currentUser: ', currentUser)      

      if(currentUser && requiredEmployeeTypes.includes(currentUser[0].EmployeeType)){
        console.log('Right data')
        return true
      } else{
        console.log('wrong data')
        this.router.navigate(['/authentication'])
        return false
      }

    //   if(localStorage.getItem('employee')){
    //     return true;
    //   }
      
    // return this.employeeService.isEmployeeLoggedIn;
  }
  
}
