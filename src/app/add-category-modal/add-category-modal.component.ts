import { Component, OnInit} from '@angular/core';
import { Category } from '@app/data-types';
import { CategoriesService } from '@app/services/categories.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})

export class AddCategoryModalComponent implements OnInit {

  onCategoryAdded?: (newCategory: Category) => void

  constructor(public modal: NgbActiveModal, private categoriesService: CategoriesService) { }

  cancel(){
    this.modal.dismiss('Cancel Clicked')
  }

  ngOnInit(): void {
  }

  submit(data: Category){
    console.log('data: ', data)
    this.categoriesService.addCategory(data).subscribe((result) => {
      this.modal.close()
      this.onCategoryAdded?.(result)
    })
  }

}
