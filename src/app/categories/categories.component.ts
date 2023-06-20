import { Component, OnInit } from '@angular/core'
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CategoriesService } from '@app/services/categories.service'
import { Category, Product } from '@app/data-types'
import { UpdateCategoryModalComponent } from '@app/update-category-modal/update-category-modal.component'
import { ProductsService } from '@app/services/products.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []
  products: Product[] = []
  searchResult: undefined | Category[]

  constructor(
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res
    })
  }

  getProducts(){
    this.productsService.getProducts().subscribe((res) =>{
      this.products = res
    })
  }


  OpenAddCategoryModal() {
    let modalRef = this.modalService.open(AddCategoryModalComponent)
    modalRef.componentInstance.onCategoryAdded = this.onCategoryAdded.bind(this)
  }

  onCategoryAdded(newCategory: Category) {
    this.categories.push(newCategory)
  }

  
  openUpdateCategoryModal(categoryId: number) {
    console.log(categoryId)
    let modalRef = this.modalService.open(UpdateCategoryModalComponent)
    modalRef.componentInstance.categoryId = categoryId
    modalRef.componentInstance.onCategoryUpdated = this.onCategoryUpdated.bind(
      this,
    )
  }  

  onCategoryUpdated(updatedCategory: Category) {
    let index = this.categories.findIndex((c) => c.id === updatedCategory.id)
    if (index >= 0) {
      this.categories[index] = updatedCategory
    }
  }

  deleteCategory(categoryId: number) {
    let catName = ''
    this.categoriesService.getCatNameById(categoryId).subscribe((result) => {
      console.log(result)
      catName = result
      this.productsService.getProductsByCategory(catName).subscribe((res)=>{
        console.log(res)
        this.products = res
        this.products.forEach((product) => {
          this.productsService.deleteProduct(product.id).subscribe(() => {
            let index = this.products.findIndex(c => c.id === product.id)
            if(index >= 0){
              this.products.splice(index, 1)
            }
          })
        })
      })
    })

    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      let index = this.categories.findIndex(c => c.id === categoryId)
      if(index >= 0){
        this.categories.splice(index, 1)
      }
    })
    
  }

  searchCategory(query: KeyboardEvent){
    if(query){
      let element = query.target as HTMLInputElement
      // console.log('element: ', element.value)
      this.categoriesService.searchCategories(element.value).subscribe((result) => {
        this.categories = result
      })
    }
  }

}
