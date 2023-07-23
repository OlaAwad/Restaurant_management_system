import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierProductsComponent } from './cashier-products/cashier-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { EmployeeAuthComponent } from './employee-auth/employee-auth.component';
import { EmployeesComponent } from './employees/employees.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {path: 'authentication', component: EntryPointComponent},
  {path: 'categories', component: CategoriesComponent, canActivate:[AuthGuard], data: {employeeType: 'Admin'}},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: {employeeType: 'Admin'}},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: {employeeType: 'Admin,Chef,Cashier'}},
  {path: 'sales', component: SalesComponent, canActivate: [AuthGuard], data: {employeeType: 'Admin'}},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: {employeeType: 'Admin'}},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: {employeeType: 'Admin'}},
  {path: 'employee-auth', component: EmployeeAuthComponent},
  {path: 'cashierProducts', component: CashierProductsComponent, canActivate: [AuthGuard], data: {employeeType: 'Cashier'}},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard], data: {employeeType: 'Cashier'}}
  // {path: 'home', component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
