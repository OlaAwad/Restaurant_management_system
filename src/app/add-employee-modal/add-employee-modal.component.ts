import { Component, OnInit } from '@angular/core';
import { SignUp } from '@app/data-types';
import { EmployeeService } from '@app/services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent implements OnInit {

  isAdmin: boolean = false
  employeeTypes: string[] = ['Admin', 'Chef', 'Casheir']
  selectedType: string = ''
  onEmployeeAdded?: (newEmployee: SignUp) => void


  constructor(private employeeService: EmployeeService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.employeeService.employeeType$.subscribe((type) => {
      if(type == 'Admin'){
        this.isAdmin = true
      } else{
        this.isAdmin = false
      }
    })
  }

  onEmpTypeSelected(type: string){
    this.selectedType = type
    // console.log(this.selectedType)
  }

  submit(data: SignUp){
    data.EmployeeType = this.selectedType
    let today = new Date()
    data.RegistrationDate = today.toLocaleDateString()
    console.log(data)
    this.employeeService.employeeSignUp(data).subscribe((result) => {
      this.modal.close()
      this.onEmployeeAdded?.(result)
    })
  }

  cancel(){
    this.modal.dismiss()
  }
}
