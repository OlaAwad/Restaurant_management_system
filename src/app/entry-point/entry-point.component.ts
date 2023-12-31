import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { EmployeeService } from '@app/services/employee.service'

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.css'],
})
export class EntryPointComponent implements OnInit {
  // employeeType: string = ''
  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    let buttons = document.querySelectorAll('.btn-group-vertical button')
    buttons.forEach((element: Element) => {
      let button = element as HTMLButtonElement
      button.addEventListener('click', () => {
        const innerHTML = button.innerHTML
        // console.log(innerHTML);
        // localStorage.setItem('EmployeeType', innerHTML)
        this.employeeService.setEmployeeType(innerHTML)
        this.router.navigate(['/employee-auth'])
        // this.getEmployeeType()
      })
    })
  }


  // getEmployeeType(){
  //   let empType = localStorage.getItem('EmployeeType')
  //   this.employeeType = empType!
  // }
}
