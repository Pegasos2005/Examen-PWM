import { Component, inject, OnInit } from '@angular/core';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrderService } from '../order.service';
import { CustomerService } from '../../customers/customer.service';
import { ProductService } from '../../products/product.service';
import { Order } from '../../../core/models/order';
import { Customer } from '../../../core/models/customer';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderFormComponent],
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

  orders: Order[] = [];
  customers: Customer[] = [];
  products: Product[] = [];

  ngOnInit() {
    this.customerService.getCustomers().subscribe(c => this.customers = c);
    this.productService.getProducts().subscribe(p => this.products = p);
    this.orderService.getOrders().subscribe(o => this.orders = o);
  }

  getCustomerName(id: string): string {
    const customer = this.customers.find(c => c.id === id);
    return customer ? customer.name : 'Loading...';
  }

  getProductName(id: string): string {
    const product = this.products.find(p => p.id === id);
    return product ? product.name : 'Loading...';
  }

  onDelete(id: string | undefined) {
    if (id && confirm('Delete order?')) this.orderService.deleteOrder(id);
  }

  onEdit(order: Order) {
    this.orderService.setOrderToEdit(order);
  }
}
