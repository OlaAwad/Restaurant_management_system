import { Pipe, PipeTransform } from '@angular/core';
import { Category, Product } from '@app/data-types';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(products: Product[], category: Category): Product[] {
    return products.filter(product => product.ProductCategory === category.CategoryName);
  }

}
