import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAuthComponent } from './employee-auth/employee-auth.component';

const routes: Routes = [
  {path: 'employee-auth', component: EmployeeAuthComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
