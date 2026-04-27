import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../product.service';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductFormComponent, AsyncPipe],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products$ = this.productService.getProducts();

  onDelete(id: string | undefined) {
    if (id && confirm('Delete product?')) {
      this.productService.deleteProduct(id);
    }
  }

  onEdit(product: Product) {
    this.productService.setProductToEdit(product);
  }
}
