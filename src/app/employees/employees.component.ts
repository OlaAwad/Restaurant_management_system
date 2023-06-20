import { Component, OnInit } from '@angular/core';
import { AddEmployeeModalComponent } from '@app/add-employee-modal/add-employee-modal.component';
import { SignUp } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';
import { UpdateEmployeeModalComponent } from '@app/update-employee-modal/update-employee-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: SignUp[] = []
  constructor(private employeesService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe((res) => {
      this.employees = res
    })
  }

  OpenAddEmployeeModal(){
    let modalRef = this.modalService.open(AddEmployeeModalComponent)
    modalRef.componentInstance.onEmployeeAdded = this.onEmployeeAdded.bind(this)
  }

  onEmployeeAdded(newEmployee: SignUp){
    this.employees.push(newEmployee)
  }

  openUpdateEmployeeModal(employeeId: number){
    let modalRef = this.modalService.open(UpdateEmployeeModalComponent)
    modalRef.componentInstance.employeeId = employeeId
    modalRef.componentInstance.onEmployeeUpdated = this.onEmployeeUpdated.bind(this)
  }

  onEmployeeUpdated(updatedEmployee: SignUp){
    let index = this.employees.findIndex((c) => c.id === updatedEmployee.id)
    if(index >= 0){
      this.employees[index] = updatedEmployee
    }
  }

  deleteEmployee(employeeId: number){
    this.employeesService.deleteEmployee(employeeId).subscribe(() => {
      let index = this.employees.findIndex(c => c.id == employeeId)
      if(index >= 0){
        this.employees.splice(index, 1)
      }
    })
  }

  searchEmployee(query: KeyboardEvent){
    if(query){
      let element = query.target as HTMLInputElement
      this.employeesService.searchEmployee(element.value).subscribe((result) => {
        this.employees = result
      })
    }
  }
}
