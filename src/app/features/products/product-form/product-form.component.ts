import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  editingId: string | null = null;

  productForm = this.fb.group({
    name: ['', Validators.required],
    text: ['', Validators.required]
  });

  ngOnInit() {
    this.productService.productToEdit$.subscribe(product => {
      if (product) {
        this.editingId = product.id || null;
        this.productForm.patchValue({ name: product.name, text: product.description });
      } else {
        this.editingId = null;
        this.productForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const data: Product = {
        name: this.productForm.value.name!,
        description: this.productForm.value.text!
      };

      if (this.editingId) {
        this.productService.updateProduct(this.editingId, data).then(() => this.onClear());
      } else {
        this.productService.addProduct(data).then(() => this.onClear());
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onClear() {
    this.productForm.reset();
    this.editingId = null;
    this.productService.setProductToEdit(null);
  }
}
