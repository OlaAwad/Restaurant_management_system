import { Component, Input, OnInit } from '@angular/core';
import { Category, Product } from '@app/data-types';
import { CategoriesService } from '@app/services/categories.service';
import { ProductsService } from '@app/services/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css']
})
export class UpdateProductModalComponent implements OnInit {

  @Input() productId: number = 0
  productData: Product | undefined
  onProductUpdated?: (updatedPrd: Product) => void
  categories: Category[] = []
  selectedCategory: string | undefined

  constructor(public modal: NgbActiveModal, private productsService: ProductsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId).subscribe((data) => {
      this.productData = data
    })

    this.categoriesService.getCategories().subscribe((result) => {
      this.categories = result
    })
  }
  onCategorySelected(category: Category){
    console.log(category.CategoryName)
    this.selectedCategory = category.CategoryName
  }

  submit(data: Product){
    data.ProductCategory = this.selectedCategory!
    let updatedProduct: Product = {
      id: this.productId,
      ProductName: data.ProductName,
      ProductImage: data.ProductImage,
      ProductPrice: data.ProductPrice,
      ProductAvailableQuantity: data.ProductAvailableQuantity,
      ProductCategory: data.ProductCategory
    }
    this.productsService.updateProduct(updatedProduct).subscribe((result) => {
      this.modal.close()
      this.onProductUpdated?.(result)
    })
  }

  cancel(){
    this.modal.dismiss()
  }

  

}
