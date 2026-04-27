import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { CustomerService } from '../../customers/customer.service';
import { ProductService } from '../../products/product.service';
import { Order } from '../../../core/models/order';
import { Customer } from '../../../core/models/customer';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

  editingId: string | null = null;
  customers: Customer[] = [];
  products: Product[] = [];

  orderForm = this.fb.group({
    customerId: ['', Validators.required],
    productId: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.customerService.getCustomers().subscribe(c => this.customers = c);
    this.productService.getProducts().subscribe(p => this.products = p);

    this.orderService.orderToEdit$.subscribe(order => {
      if (order) {
        this.editingId = order.id || null;
        this.orderForm.patchValue({
          customerId: order.customerId,
          productId: order.productId,
          quantity: order.quantity
        });
      } else {
        this.editingId = null;
        this.orderForm.reset({ quantity: 1 }); // Por defecto cantidad 1
      }
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const data: Order = {
        customerId: this.orderForm.value.customerId!,
        productId: this.orderForm.value.productId!,
        quantity: this.orderForm.value.quantity!
      };

      if (this.editingId) {
        this.orderService.updateOrder(this.editingId, data).then(() => this.onClear());
      } else {
        this.orderService.addOrder(data).then(() => this.onClear());
      }
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  onClear() {
    this.orderForm.reset({ quantity: 1 });
    this.editingId = null;
    this.orderService.setOrderToEdit(null);
  }
}
