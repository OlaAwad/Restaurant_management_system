import { Component, OnInit, Input } from '@angular/core';
import { SignUp } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-employee-modal',
  templateUrl: './update-employee-modal.component.html',
  styleUrls: ['./update-employee-modal.component.css']
})
export class UpdateEmployeeModalComponent implements OnInit {

  @Input() employeeId: number = 0
  employeeData: SignUp | undefined
  onEmployeeUpdated?: (updatedEmp: SignUp) => void
  employeeTypes: string[] = ['Admin', 'Chef', 'Cashier']
  selectedEmpType: string | undefined

  constructor(public modal: NgbActiveModal, private employeesService: EmployeeService) { }

  ngOnInit(): void {
    this.employeesService.getEmployee(this.employeeId).subscribe((data) => {
      this.employeeData = data
    })
  }

  onEmpTypeSelected(type: string){
    this.selectedEmpType = type
  }

  submit(data: SignUp){
    data.EmployeeType = this.selectedEmpType!
    let updatedEmployee: SignUp = {
      id: this.employeeId,
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      RegistrationDate: data.RegistrationDate,
      EmployeeType: data.EmployeeType
    }
    this.employeesService.updateEmployee(updatedEmployee).subscribe((result) => {
      this.modal.close()
      this.onEmployeeUpdated?.(result)
    })
  }

  cancel(){
    this.modal.dismiss()
  }

}
