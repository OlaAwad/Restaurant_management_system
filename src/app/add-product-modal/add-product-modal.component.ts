import { Component, OnInit } from '@angular/core';
import { Category, Product } from '@app/data-types';
import { CategoriesService } from '@app/services/categories.service';
import { ProductsService } from '@app/services/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent implements OnInit {

  onProductAdded?: (newProduct: Product) => void
  categories: Category[] = []
  selectedCategory: Category | undefined

  constructor(public modal: NgbActiveModal, private productsService: ProductsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((result) => {
      this.categories = result
    })
  }

  cancel(){
    this.modal.dismiss()
  }

  onCategorySelected(category: Category){
    this.selectedCategory = category
  }

  submit(data: Product){
    data.ProductCategory = this.selectedCategory!
    this.productsService.addProduct(data).subscribe((result) => {
      this.modal.close()
      this.onProductAdded?.(result)
    })
  }

}
