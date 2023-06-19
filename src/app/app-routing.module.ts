import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { EmployeeAuthComponent } from './employee-auth/employee-auth.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  // {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  {path: 'authentication', component: EntryPointComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'employee-auth', component: EmployeeAuthComponent},
  // {path: 'home', component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
