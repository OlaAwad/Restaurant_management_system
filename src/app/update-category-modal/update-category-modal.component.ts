import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '@app/data-types';
import { CategoriesService } from '@app/services/categories.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-category-modal',
  templateUrl: './update-category-modal.component.html',
  styleUrls: ['./update-category-modal.component.css']
})
export class UpdateCategoryModalComponent implements OnInit {

  @Input() categoryId: number = 0
  categoryData: Category | undefined
  onCategoryUpdated?: (updatedCat: Category) => void

  constructor(public modal: NgbActiveModal, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategory(this.categoryId).subscribe((data) => {
      this.categoryData = data
    })
  }

  submit(data: Category){
    // console.log('data: ', data)
    let updatedCategory: Category = {
      id: this.categoryId,
      CategoryName: data.CategoryName,
      CategoryImage: data.CategoryImage
    }
    this.categoriesService.updateCategory(updatedCategory).subscribe((result) => {
      this.modal.close()
      this.onCategoryUpdated?.(result)
    })
    
  }
  
  cancel(){
    this.modal.dismiss()
  }



}
