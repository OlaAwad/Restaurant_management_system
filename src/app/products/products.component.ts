import { Component, OnInit } from '@angular/core';
import { Product } from '@app/data-types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ProductsService } from '@app/services/products.service';
import { AddProductModalComponent } from '@app/add-product-modal/add-product-modal.component';
import { UpdateProductModalComponent } from '@app/update-product-modal/update-product-modal.component';
import { EmployeeService } from '@app/services/employee.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  searchResult: undefined | Product[]
  employeeType: string = ''

  constructor(private modalService: NgbModal, private productsService: ProductsService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getProducts()
    this.employeeService.employeeType$.subscribe((type) => {
      this.employeeType = type!
    })
  }

  getProducts(){
    this.productsService.getProducts().subscribe((result) => {
      this.products = result
    })
  }

  OpenAddProductModal(){
    let modalRef = this.modalService.open(AddProductModalComponent)
    modalRef.componentInstance.onProductAdded = this.onProductAdded.bind(this)
  }

  onProductAdded(newProduct: Product){
    this.products.push(newProduct)
  }

  openUpdateProductModal(productId: number){
    let modalRef = this.modalService.open(UpdateProductModalComponent)
    modalRef.componentInstance.productId = productId
    modalRef.componentInstance.onProductUpdated = this.onProductUpdated.bind(this)
  }

  onProductUpdated(updatedProduct: Product){
    let index = this.products.findIndex((c) => c.id === updatedProduct.id)
    if(index >= 0){
      this.products[index] = updatedProduct
    }
  }

  deleteProduct(productId: number){
    this.productsService.deleteProduct(productId).subscribe(() => {
      let index = this.products.findIndex(c => c.id === productId)
      if(index >= 0){
        this.products.splice(index, 1)
      }
    })
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      let element = query.target as HTMLInputElement
      this.productsService.searchProducts(element.value).subscribe((result) => {
        this.products = result
      })
    }
  }

}
