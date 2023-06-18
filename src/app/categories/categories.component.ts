import { Component, OnInit } from '@angular/core'
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CategoriesService } from '@app/services/categories.service'
import { Category } from '@app/data-types'
import { UpdateCategoryModalComponent } from '@app/update-category-modal/update-category-modal.component'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []

  constructor(
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res
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
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      let index = this.categories.findIndex(c => c.id === categoryId)
      if(index >= 0){
        this.categories.splice(index, 1)
      }
    })
    
  }
}
