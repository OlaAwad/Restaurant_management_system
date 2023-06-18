import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeAuthComponent } from './employee-auth/employee-auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavBodyComponent } from './sidenav-body/sidenav-body.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SettingsComponent } from './settings/settings.component';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCategoryModalComponent } from './update-category-modal/update-category-modal.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { UpdateProductModalComponent } from './update-product-modal/update-product-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeAuthComponent,
    HomeComponent,
    SidenavComponent,
    SidenavBodyComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductsComponent,
    SalesComponent,
    SettingsComponent,
    AddCategoryModalComponent,
    UpdateCategoryModalComponent,
    AddProductModalComponent,
    UpdateProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgbModule
    ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
